import React from "react";

interface Props {
  list: string[];
}

const Recommendations: React.FC<Props> = ({ list }) => {
  return (
    <div>
      <h3>You might like:</h3>
      <ul>
        {list.map((movie) => (
          <li key={movie}>{movie}</li>
        ))}
      </ul>
    </div>
  );
};

export default Recommendations;
