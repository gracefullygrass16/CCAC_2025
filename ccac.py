from flask import Flask, render_template, jsonify, request
from config import Config
# from forms import QuizSubmissionForm
# from wtforms import Form, FieldList, IntegerField
# from wtforms.validators import InputRequired, NumberRange

# import matplotlib
# from matplotlib import pyplot as plt
# matplotlib.use('Agg')
# import io
# import base64

# from flask_sqlalchemy import SQLAlchemy
# from datetime import datetime

ccac = Flask(__name__, static_folder="static")
ccac.config.from_object(Config)

# ccac.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///ccac.db' 
# db = SQLAlchemy(ccac)

# class Collectresults(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     content = db.Column(db.String(200), nullable=False)
#     date_created = db.Column(db.DateTime, default=datetime.utcnow)

#     def __repr__(self):
#         return '<Results %r>' % self.id

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
        # 1. get and parse incoming json data
        data = request.get_json()

        # 2. Validate required fields
        if not data:
            return jsonify({
                "success": False,
                "message": "No data received"
            }), 400
        
        selections = data.get('selections', {})
        return jsonify({
            "success": True,
            "message": "Results submitted successfully!"
        })

        # 3. Basic data validation
        if not selections or not normalized_scores:
            return jsonify({
                "success": False,
                "message": "Missing required fields"
            }), 400
        
        if len(normalized_scores) != 5:
            return jsonify({
                "success": False,
                "message": "Invalid scores format"
            }), 400

        # 4. (Potential) Database storage
        # Currently commented out in the original code:
        # new_result = Collectresults(content=str(data))
        # db.session.add(new_result)
        # db.session.commit()
        
        # 5. Return success response
        return jsonify({
            "success": True,
            "message": "Results submitted successfully!",
            "received_scores": normalized_scores  # echo back for debugging

        # so successful submissions return (json)
        # {
        # "success": true,
        # "message": "Results submitted successfully!",
        # "received_scores": [75, 82, 64, 91, 73]
        # }

        })

    except Exception as e:
        # 6. Handle unexpected errors
        ccac.logger.error(f"Error processing submission: {str(e)}")
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

    return render_template("results.html", scores=scores)



    # using matplotlib to generate an image (but not needed cuz the javascript is alr there)

    # img_url = generate_bar_chart(scores)
    # return render_template("results.html", img_url=img_url)

# def generate_bar_chart(scores):
#     categories = ["Sensibility", "Trustworthiness", "Altruism", "Self-Discipline", "Resilience"]
#     plt.figure(figsize=(8, 5))
#     plt.bar(categories, scores, color=["blue", "green", "orange", "red", "purple"])

#     # formatting
#     plt.ylim(0, 100)
#     plt.xlabel("Categories")
#     plt.ylabel("Score (%)")
#     plt.title("Your Results")

#     # convert to base64 for html embedding
#     buf = io.BytesIO()
#     plt.savefig(buf, format="png")
#     buf.seek(0)
#     img_base64 = base64.b64encode(buf.read()).decode("utf-8")
#     buf.close() # prevent memory leaks

#     return f"data:image/png;base64,{img_base64}"


if __name__ == "__main__":
    ccac.run(debug=True, host="0.0.0.0", port=5001)
    # debug=true so if there're any errors it'll pop up on the webpage and we can see

