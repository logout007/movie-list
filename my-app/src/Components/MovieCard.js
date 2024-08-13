// src/MovieCard.js

import React from 'react';

function MovieCard({ movie }) {
  const { Title, Poster, Year } = movie;

  // Use a placeholder image if Poster is "N/A"
  const posterUrl = Poster !== "N/A" ? Poster : 'https://via.placeholder.com/500x750?text=No+Image';

  return (
    <div className="movie-card">
      <img src={posterUrl} alt={`${Title} poster`} />
      <div className="movie-card-content">
        <h2>{Title}</h2>
        <p>{Year}</p>
      </div>
    </div>
  );
}

export default MovieCard;
