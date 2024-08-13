// src/MovieList.js

import React, { useState, useEffect } from 'react';
import { fetchMovies } from '../Util/api';
import SearchBar from './SearchBar';
import MovieCard from './MovieCard';
import Loader from './Loader';


function MovieList() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const loadMovies = async () => {
      setLoading(true);
      setError('');  // Reset error message
      const response = await fetchMovies(query, page);
      if (response.Response === "False") {
        setError(response.Error);
      } else {
        setMovies((prevMovies) => [...prevMovies, ...response]);
      }
      setLoading(false);
    };

    if (query) {
      loadMovies();
    }
  }, [page, query]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 2) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (searchQuery) => {
    setMovies([]);
    setPage(1);
    setQuery(searchQuery);
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      {error && <p className="error-message">{error}</p>}
      <div className="movie-list">
        {movies.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </div>
      {loading && <Loader />}
    </div>
  );
}

export default MovieList;
