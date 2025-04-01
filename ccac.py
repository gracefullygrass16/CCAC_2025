from flask import Flask, render_template, jsonify, request
import matplotlib
from matplotlib import pyplot as plt
matplotlib.use('Agg')
import io
import base64

ccac = Flask(__name__, static_folder="static")

@ccac.route("/")
def index():
    return render_template("index.html")

@ccac.route("/pre-review")
def pre():
    return render_template("pre-review.html")

@ccac.route("/quiz")
def quiz():
    return render_template("quiz.html")

@ccac.route("/footer")
def footer():
    return render_template("footer.html")

@ccac.route("/navbar")
def nav():
    return render_template("navbar.html")

@ccac.route("/submit-results", methods=['GET','POST'])
def submit_quiz():
    try:
        data = request.get_json()
        selections = data.get('selections', {})
        return jsonify({
            "success": True,
            "message": "Results submitted successfully!"
        })
    except Exception as e:
        return jsonify({
            "success": False,
            "message": str(e)
        }), 500 

@ccac.route("/results")
def results():
    # Example: Using the scores generated earlier
    scores = request.args.get('scores', None)  # Fetch scores passed via query parameters or database
    if scores:
        scores = list(map(float, scores.split(',')))  # Ensure scores are in a list of floats
    else:
        scores = [0, 0, 0, 0, 0]  # Default to zeros if no scores passed

    # You can use the `scores` to regenerate the chart if necessary
    img_url = generate_bar_chart(scores)

    return render_template("results.html", img_url=img_url)

def generate_bar_chart(scores):
    categories = ["Sensibility", "Trustworthiness", "Altruism", "Self-Discipline", "Resilience"]
    plt.figure(figsize=(8, 5))
    plt.bar(categories, scores, color=["blue", "green", "orange", "red", "purple"])
    plt.ylim(0, 100)
    plt.xlabel("Categories")
    plt.ylabel("Score (%)")
    plt.title("Quiz Results")

    buf = io.BytesIO()
    plt.savefig(buf, format="png")
    buf.seek(0)
    img_base64 = base64.b64encode(buf.read()).decode("utf-8")
    buf.close()

    return f"data:image/png;base64,{img_base64}"

if __name__ == "__main__":
    ccac.run(debug=True, host="0.0.0.0", port=5001)

