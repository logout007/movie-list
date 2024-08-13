// src/App.js

import React from 'react';
import Header from './Components/Header';
import MovieList from './Components/MovieList';
import './App.css'

function App() {
  return (
    <div className="App">
      <Header />
      <div className="container">
        <MovieList />
      </div>
    </div>
  );
}

export default App;
