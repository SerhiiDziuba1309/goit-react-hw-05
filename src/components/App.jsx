import toast, { Toaster } from 'react-hot-toast';
import SearchBar from '../components/SearchBar/SearchBar';
import ImageGallery from '../components/ImageGallery/ImageGallery';
import LoadMoreBtn from '../components/LoadMoreBtn/LoadMoreBtn';
import ErrorMessage from '../components/ErrorMessage/ErrorMessage';
import ImageModal from '../components/ImageModal/ImageModal';
import Loader from '../components/Loader/Loader';
import s from './App.module.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

const UNSPLASH_API_URL = 'https://api.unsplash.com/search/photos';
const ACCESS_KEY = 'O4CmHlBkk719CuCc7klHPeRJhobiuP_mtC-K1hus2V0';

const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [modalImage, setModalImage] = useState(null);

  useEffect(() => {
    if (!query) return;
    setLoading(true);
    setError(null);

    axios
      .get(UNSPLASH_API_URL, {
        params: {
          query,
          page,
          per_page: 20,
          client_id: ACCESS_KEY,
        },
      })
      .then(response => {
        if (response.data.results.length === 0) {
          toast.error('No results found. Try a different keyword');
          return;
        }
        setImages(prevImages => [...prevImages, ...response.data.results]);
      })
      .catch(() => {
        setError('Something went wrong.Please try again later');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [query, page]);

  const handleSearch = searchQuery => {
    setQuery(searchQuery);
    setImages([]);
    setPage(1);
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const openModal = image => {
    setModalImage(image);
  };
  const closeModal = () => {
    setModalImage(null);
  };

  return (
    <div className={s.app}>
      <Toaster position="top-right" />
      <SearchBar onSubmit={handleSearch} />
      {error && <ErrorMessage message={error} />}
      <ImageGallery images={images} onImageClick={openModal} />
      {loading && <Loader />}
      {images.length > 0 && !loading && <LoadMoreBtn onClick={loadMore} />}
      {modalImage && (
        <ImageModal modalImage={modalImage} onClose={closeModal} />
      )}
    </div>
  );
};

export default App;
