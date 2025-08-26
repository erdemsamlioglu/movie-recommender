from flask import Flask, request, jsonify
from recommender import recommend_from_ratings, get_closest_titles
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/recommend", methods=["POST"])
def recommend():
    data = request.get_json()
    ratings = data.get("ratings", {})
    
    if not ratings:
        return jsonify({"error": "No ratings provided"}), 400
    
    recommendations = recommend_from_ratings(ratings)
    return jsonify({"recommendations": recommendations})


@app.route("/suggest", methods=["GET"])
def suggest():
    query = request.args.get("q", "")
    if not query:
        return jsonify([])

    suggestions = get_closest_titles(query)
    return jsonify(suggestions)


if __name__ == "__main__":
    app.run(debug=True)
