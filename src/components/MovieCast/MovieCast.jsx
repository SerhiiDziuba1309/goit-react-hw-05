import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import s from './MovieCast.module.css';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const fetchMovieCredits = async () => {
      const response = await axios.get(`${BASE_URL}/movie/${movieId}/credits`, {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      });
      setCast(response.data.cast || []);
    };

    fetchMovieCredits();
  }, [movieId]);

  return (
    <ul className={s.list}>
      {cast.map(({ id, name, character, profile_path }) => (
        <li key={id} className={s.item}>
          {profile_path && (
            <img
              src={`https://image.tmdb.org/t/p/w200${profile_path}`}
              alt={name}
              className={s.image}
            />
          )}
          <div className={s.details}>
            <p className={s.text}>{name}</p>
            <p className={s.text}>Character: {character}</p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default MovieCast;
