// src/api.js

import axios from 'axios';

const API_KEY = 'c9187918';
const BASE_URL = 'http://www.omdbapi.com/';

export const fetchMovies = async (query, page = 1) => {
  const response = await axios.get(BASE_URL, {
    params: {
      apikey: API_KEY,
      s: query,
      page: page,
    },
  });
  
  // The OMDB API returns the movies in a `Search` array
  return response.data.Search || [];
};
