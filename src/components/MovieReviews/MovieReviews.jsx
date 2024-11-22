import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import s from './MovieReviews.module.css';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchMovieReviews = async () => {
      const response = await axios.get(`${BASE_URL}/movie/${movieId}/reviews`, {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      });
      setReviews(response.data.results || []);
    };

    fetchMovieReviews();
  }, [movieId]);

  return reviews.length > 0 ? (
    <ul className="s.list">
      {reviews.map(({ id, author, content }) => (
        <li key={id} className="s.item">
          <p>
            <b className={s.author}>{author}</b>: {content}
          </p>
        </li>
      ))}
    </ul>
  ) : (
    <p>No reviews found.</p>
  );
};

export default MovieReviews;
