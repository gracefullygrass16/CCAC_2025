from flask import Flask, render_template, jsonify, request
from config import Config

from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

from flask_migrate import Migrate

# from forms import QuizSubmissionForm
# from wtforms import Form, FieldList, IntegerField
# from wtforms.validators import InputRequired, NumberRange


ccac = Flask(__name__, static_folder="static")
ccac.config.from_object(Config)

ccac.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///ccac.db' 
db = SQLAlchemy(ccac)
migrate = Migrate(ccac, db)

class QuizResult(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    selections = db.Column(db.JSON)  # Stores the raw answer data
    normalized_scores = db.Column(db.JSON)  # Stores the calculated scores
    collection_type = db.Column(db.String(50))
    reviewer_name = db.Column(db.String(100)) 
    reviewee_name = db.Column(db.String(100)) 
    cca = db.Column(db.String(100)) 
    submission_date = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f'<Result {self.id}>'



@ccac.route("/")
def index():
    return render_template("index.html")

@ccac.route("/pre-review")
def pre():
    return render_template("pre-review.html")

@ccac.route("/quiz")
def quiz():
    return render_template("quiz.html", 
        review_type=request.args.get('review_type', 'self'),
        reviewer_name=request.args.get('reviewer_name', ''),
        reviewee_name=request.args.get('reviewee_name', ''),
        cca=request.args.get('cca', '')
    )

@ccac.route("/footer")
def footer():
    return render_template("footer.html")

@ccac.route("/navbar")
def nav():
    return render_template("navbar.html")

@ccac.route("/submit-results", methods=['POST'])
def submit_quiz():
        
    try:
        # Get and parse incoming json data
        data = request.get_json()

        # Validate data
        if not data or 'normalized_scores' not in data:
            return jsonify({"success": False, "message": "Invalid data"}), 400

        # Create and save new result
        new_result = QuizResult(
            selections=data.get('selections'),
            normalized_scores=data['normalized_scores'],
            collection_type=data.get('collection_type', 'self'),
            reviewer_name=data.get('reviewer_name', ''),
            reviewee_name=data.get('reviewee_name', ''),
            cca=data.get('cca', '')
        )

        db.session.add(new_result)
        db.session.commit()

        # Return success with result ID
        return jsonify({
            "success": True,
            "message": "Results saved successfully!",
            "result_id": new_result.id,
            "scores": data['normalized_scores']
        })


    except Exception as e:
        db.session.rollback()
        ccac.logger.error(f"Database error: {str(e)}")
        return jsonify({
            "success": False, 
            "message": str(e)
        }), 500


@ccac.route("/results")
def results():
    result_id = request.args.get('id')
    
    if result_id:
        result = QuizResult.query.get(result_id)
        if result:
            return render_template("results.html", 
                scores=result.normalized_scores,
                submission_date=result.submission_date.strftime('%Y-%m-%d %H:%M')
            )
    
    # # Fallback - pass scores as both template variable and URL param
    # scores = request.args.get('scores', '0,0,0,0,0')
    # score_list = list(map(float, scores.split(',')))
    # return render_template("results.html", 
    #     scores=score_list,
    #     submission_date="Unknown"
    # )



if __name__ == "__main__":
    ccac.run(debug=True, host="0.0.0.0", port=5001)
    # debug=true so if there're any errors it'll pop up on the webpage and we can see

