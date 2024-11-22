import { Link } from 'react-router-dom';
import s from './NotFoundPage.module.css';

const NotFoundPage = () => (
  <div className={s.container}>
    <h1 className={s.title}>404 - Page Not Found</h1>
    <p className={s.text}>The page you are looking for doesn't exist.</p>
    <Link to="/" className={s.link}>
      Go to Home
    </Link>
  </div>
);

export default NotFoundPage;
