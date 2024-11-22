import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from '../components/Navigation/Navigation';
import s from './App.module.css';

const HomePage = lazy(() => import('../pages/HomePage/HomePage'));
const MoviesPage = lazy(() => import('../pages/MoviesPage/MoviesPage'));
const MovieDetailsPage = lazy(() =>
  import('../pages/MovieDetailsPage/MovieDetaisPage')
);
const MovieCast = lazy(() => import('../components/MovieCast/MovieCast'));
const MovieReviews = lazy(() =>
  import('../components/MovieReviews/MovieReviews')
);
const NotFoundPage = lazy(() => import('../pages/NotFoundPage/NotFoundPage'));

const App = () => (
  <div className={s.appContainer}>
    <header className={s.header}>Movie Search App</header>

    <Navigation />

    <main className={s.main}>
      <Suspense fallback={<p>Loading...</p>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
            <Route path="cast" element={<MovieCast />} />
            <Route path="reviews" element={<MovieReviews />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </main>

    <footer className={s.footer}>
      © 2024 Movie Search App. All rights reserved.
    </footer>
  </div>
);

export default App;
