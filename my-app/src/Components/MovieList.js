import React, { useState, useEffect } from "react";
import { fetchMovies } from "../Util/api";
import SearchBar from "./SearchBar";
import MovieCard from "./MovieCard";
import Loader from "./Loader";

function MovieList() {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedYearRanges, setSelectedYearRanges] = useState([]);
  const [tempSelectedTypes, setTempSelectedTypes] = useState([]); // Holds temporary selections
  const [tempSelectedYearRanges, setTempSelectedYearRanges] = useState([]); // Holds temporary selections
  const [showFavMovie , setShowFavMovies] = useState(false)

  const favMovies = JSON.parse(localStorage.getItem("favorites"));

  // Temporary handler for type selection
  const handleTempTypeChange = (Type) => {
    console.log("Type", Type);

    setTempSelectedTypes(
      (prevTypes) =>
        prevTypes.includes(Type)
          ? prevTypes.filter((t) => t !== Type) // Remove if already selected
          : [...prevTypes, Type] // Add if not selected
    );
  };

  // Temporary handler for year range selection
  const handleTempYearRangeChange = (range) => {
    setTempSelectedYearRanges(
      (prevRanges) =>
        prevRanges.some((r) => r.label === range.label)
          ? prevRanges.filter((r) => r.label !== range.label) // Remove if already selected
          : [...prevRanges, range] // Add if not selected
    );
  };

  // Apply the selected filters when the Apply button is clicked
  const handleApplyFilters = () => {
    setSelectedTypes(tempSelectedTypes);
    setSelectedYearRanges(tempSelectedYearRanges);
  };

  useEffect(() => {
    const filteredItems = movies.filter((movie) => {
      console.log("selectedTypes", selectedTypes);
      console.log("Type:", movie.Type);
      console.log("Title:", movie.Title);
      // const movieType = movie.Type.toLowerCase();

      // const typeMatches =
      //   selectedTypes.length > 0 &&
      //   selectedTypes.some((type) => type.toLowerCase() === movieType);
      const matchesType =
        selectedTypes.length > 0 && selectedTypes.includes(movie.Type);

      const matchesYear =
        selectedYearRanges.length === 0 ||
        selectedYearRanges.some(
          (range) => movie.Year >= range.min && movie.Year <= range.max
        );

      return matchesType || matchesYear;
    });

    console.log("Filtered Items: ", filteredItems);

    setFilteredMovies(filteredItems);
  }, [movies, selectedTypes, selectedYearRanges]);

  useEffect(() => {
    const loadMovies = async () => {
      setLoading(true);
      setError(""); // Reset error message
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

  const onFavClick = (()=>{
    console.log("favMovies",favMovies);
    setShowFavMovies(!showFavMovie)
  })

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 2
      ) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (searchQuery) => {
    setMovies([]);
    setPage(1);
    setQuery(searchQuery);
  };

  return (
    <div>
      <SearchBar
        onSearch={handleSearch}
        handleTempTypeChange={handleTempTypeChange}
        tempSelectedTypes={tempSelectedTypes}
        tempSelectedYearRanges={tempSelectedYearRanges}
        handleTempYearRangeChange={handleTempYearRangeChange}
        handleApplyFilters={handleApplyFilters}
        onFavClick={onFavClick}
      />
      {error && <p className="error-message">{error}</p>}
      <div className="movie-list">
        {
          showFavMovie ? <>        {favMovies && favMovies.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}</> :<>        {filteredMovies.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}</>
        }

      </div>
      {loading && <Loader />}
    </div>
  );
}

export default MovieList;
