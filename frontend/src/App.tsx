import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import Recommendations from "./components/Recommendations";
import axios from "axios";
import "./App.css";

interface MovieRating {
  title: string;
  rating: number;
}

function App() {
  const [selectedRatings, setSelectedRatings] = useState<MovieRating[]>([]);
  const [recommendations, setRecommendations] = useState<string[]>([]);

  const handleSelect = (title: string) => {
    if (!selectedRatings.find((m) => m.title === title)) {
      setSelectedRatings([...selectedRatings, { title, rating: 5 }]);
    }
  };

  const handleRatingChange = (title: string, rating: number) => {
    setSelectedRatings((prev) =>
      prev.map((m) => (m.title === title ? { ...m, rating } : m))
    );
  };

  const getRecommendations = async () => {
    if (selectedRatings.length === 0) return;

    try {
      const ratingsPayload: { [title: string]: number } = {};
      selectedRatings.forEach((m) => {
        ratingsPayload[m.title] = m.rating;
      });

      const res = await axios.post("http://localhost:5000/recommend", {
        ratings: ratingsPayload,
      });

      console.log("Response from backend:", res.data);

      const recsRaw = res.data.recommendations || res.data;
      const recs = Object.keys(recsRaw ?? {});

      console.log("Parsed recommendations:", recs);
      setRecommendations(recs);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    }
  };

  const resetAll = () => {
    setSelectedRatings([]);
    setRecommendations([]);
  };

  return (
    <div className="app-container">
      <h1>🎥 Movie Recommender</h1>
      <SearchBar onSelect={handleSelect} />

      {selectedRatings.length > 0 && (
        <>
          <div className="selected">
            <strong>Selected Movies:</strong>
            <ul>
              {selectedRatings.map((m) => (
                <li key={m.title}>
                  {m.title}
                  <select
                    value={m.rating}
                    onChange={(e) =>
                      handleRatingChange(m.title, Number(e.target.value))
                    }
                    style={{ marginLeft: "0.5em" }}
                  >
                    {[1, 2, 3, 4, 5].map((n) => (
                      <option key={n} value={n}>
                        {n} ⭐
                      </option>
                    ))}
                  </select>
                </li>
              ))}
            </ul>
          </div>
          <div className="buttons">
            <button onClick={getRecommendations}>🎯 Get Recommendations</button>
            <button onClick={resetAll}>🔁 Reset</button>
          </div>
        </>
      )}

      {recommendations.length > 0 && <Recommendations list={recommendations} />}
    </div>
  );
}

export default App;
