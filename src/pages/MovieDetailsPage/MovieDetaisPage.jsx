import { useEffect, useState, useRef, Suspense } from 'react';
import {
  useParams,
  Link,
  Outlet,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import axios from 'axios';
import s from './MovieDetailsPage.module.css';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const backLinkRef = useRef(location.state?.from || '/movies');

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/movie/${movieId}`, {
          headers: {
            Authorization: `Bearer ${API_KEY}`,
          },
        });
        setMovie(response.data);
      } catch (error) {
        console.error('Failed to fetch movie details:', error);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  if (!movie) {
    return <p>Loading...</p>;
  }

  return (
    <div className={s.container}>
      <button
        onClick={() => navigate(backLinkRef.current)}
        className={s.backButton}
      >
        Go back
      </button>

      <div className={s.details}>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className={s.image}
        />
        <div>
          <h1>{movie.title || movie.name}</h1>
          <p>{movie.overview}</p>
          <p>
            <strong>Genres:</strong>{' '}
            {movie.genres.map(genre => genre.name).join(', ')}
          </p>
        </div>
      </div>

      <nav className={s.nav}>
        <Link to="cast" className={s.link}>
          Cast
        </Link>
        <Link to="reviews" className={s.link}>
          Reviews
        </Link>
      </nav>

      <Suspense fallback={<p>Loading...</p>}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default MovieDetailsPage;
