import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import MovieList from '../../components/MovieList/MovieList';
import s from './MoviesPage.module.css';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  useEffect(() => {
    const fetchMovies = async () => {
      if (!query) {
        setMovies([]);
        return;
      }

      try {
        const response = await axios.get(
          `${BASE_URL}/search/movie?query=${encodeURIComponent(query)}`,
          {
            headers: {
              Authorization: `Bearer ${API_KEY}`,
            },
          }
        );
        setMovies(response.data.results || []);
      } catch (error) {
        console.error('Error fetching movies:', error);
        setMovies([]);
      }
    };

    fetchMovies();
  }, [query]);

  const handleSearch = e => {
    e.preventDefault();
    const form = e.target;
    const searchValue = form.elements.query.value.trim();
    setSearchParams(searchValue ? { query: searchValue } : {});
  };

  return (
    <div className={s.container}>
      <form onSubmit={handleSearch} className={s.form}>
        <input
          type="text"
          name="query"
          defaultValue={query}
          placeholder="Search movies..."
          className={s.input}
        />
        <button type="submit" className={s.button}>
          Search
        </button>
      </form>
      <MovieList movies={movies} />
    </div>
  );
};

export default MoviesPage;
