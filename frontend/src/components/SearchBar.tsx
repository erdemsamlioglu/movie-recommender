import React, { useState, useEffect } from "react";
import axios from "axios";

interface Props {
  onSelect: (title: string) => void;
}

const SearchBar: React.FC<Props> = ({ onSelect }) => {
  const [input, setInput] = useState<string>("");
  const [suggestions, setSuggestions] = useState<string[]>([]);

  useEffect(() => {
    if (input.length < 2) return;
    const fetchSuggestions = async () => {
      const res = await axios.get<string[]>(`http://localhost:5000/suggest?q=${input}`);
      setSuggestions(res.data);
    };
    fetchSuggestions();
  }, [input]);

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Type a movie title..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <ul>
        {suggestions.map((title) => (
          <li key={title} onClick={() => onSelect(title)} style={{ cursor: "pointer" }}>
            {title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchBar;
