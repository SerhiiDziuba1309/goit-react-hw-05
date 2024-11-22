import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import s from './MovieList.module.css';

const MovieList = ({ movies }) => {
  const location = useLocation();
  return (
    <ul className={s.list}>
      {movies.map(movie => (
        <li className={s.item} key={movie.id}>
          <Link
            className={s.link}
            to={`/movies/${movie.id}`}
            state={{ from: location }}
          >
            {movie.title || movie.name}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;
