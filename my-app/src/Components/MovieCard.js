// src/MovieCard.js

import { useState, useEffect } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

function MovieCard({ movie }) {
  const [favorites, setFavorites] = useState(() => {
    const storedFavorites = localStorage.getItem("favorites");
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });
  console.log("favorites", favorites);

  const { Title, Poster, Year } = movie;

  // Update localStorage whenever the favorites change
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  //Function to toggle an item in the favorites list
  const toggleFavorite = (movie) => {
    console.log("movie", movie);
    setFavorites((prevFavorites) => {
      console.log("prevFavorites", prevFavorites);
      if (prevFavorites.some((fav) => fav.imdbID === movie.imdbID)) {
        // Remove from favorites if already present
        return prevFavorites.filter((fav) => fav.imdbID !== movie.imdbID);
      } else {
        // Add to favorites if not present
        return [...prevFavorites, movie];
      }
    });
  };

  // Use a placeholder image if Poster is "N/A"
  const posterUrl =
    Poster !== "N/A"
      ? Poster
      : "https://via.placeholder.com/500x750?text=No+Image";

  return (
    <div className="movie-card">
      <img src={posterUrl} alt={`${Title} poster`} />
      <div className="movie-card-content">
        <div>
          <h2>{Title}</h2>
          <p>{Year}</p>
        </div>
        <div className="movie-fevorite-icon">
          <button
            onClick={() => toggleFavorite(movie)}
            style={{
              border: "none",
              background: "none",
              cursor: "pointer",
              marginLeft: "10px",
            }}
          >
            {favorites.some((fav) => fav.imdbID === movie.imdbID) ? (
              <AiFillHeart style={{ color: "red" }} />
            ) : (
              <AiOutlineHeart style={{ color: "gray" }} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
