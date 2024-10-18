import { useEffect, useState, useCallback, useRef } from 'react';
import { fetchImages } from '../images-api';
import { Toaster, toast } from 'react-hot-toast';

import SearchBar from '../SearchBar/SearchBar';
import Loader from '../Loader/Loader';
import ErrorMessage from './ErrorMessage';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn';
import ImageGallery from '../ImageGallery/ImageGallery';
import ImageModal from '../ImageModal/ImageModal';
import ScrollToTopButton from '../ScrollToTopButton/ScrollToTopButton';

export default function App() {
  const [query, setQuery] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(false);
  const [hasMoreImages, setHasMoreImages] = useState(false);

  const galleryRef = useRef(null);
  const lastElementRef = useRef(null);

  const handleSearchSubmit = useCallback((newQuery) => {
    setQuery(newQuery);
    setPage(1);
    setImages([]);
    setError(null);
  }, []);

  const handleLoadMore = useCallback(() => {
    setPage((prevPage) => prevPage + 1);
  }, []);

  useEffect(() => {
    if (!query.trim()) return;

    const getImages = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const { results, totalPages } = await fetchImages(query, page);

        if (results.length === 0) {
          toast.error(
            'Sorry, we couldn’t find anything for your query. Please try different keywords.🧐',
          );
          setHasMoreImages(false);
        } else {
          setImages((prevImages) => (page === 1 ? results : [...prevImages, ...results]));
          const isLastPage = page >= totalPages;
          setHasMoreImages(!isLastPage);
          if (isLastPage) {
            toast.error(
              'There are no more images available. Try searching with different keywords or check back later.🔍',
            );
          }
        }
      } catch (error) {
        toast.error(error.message || 'Something went wrong');
        setHasMoreImages(false);
      } finally {
        setIsLoading(false);
      }
    };

    getImages();
  }, [query, page]);

  const openModal = useCallback((image) => {
    setSelectedImage(image);
  }, []);

  const closeModal = useCallback(() => {
    setSelectedImage(false);
  }, []);

  useEffect(() => {
    if (selectedImage) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
  }, [selectedImage]);

  // autoscrolling after loading images
  useEffect(() => {
    if (page > 1 && lastElementRef.current) {
      const updateScroll = () => {
        const { height } = lastElementRef.current.getBoundingClientRect();
        window.scrollBy({
          top: height * 1.9,
          behavior: 'smooth',
        });
      };

      const img = lastElementRef.current.querySelector('img');
      if (img.complete) {
        updateScroll();
      } else {
        img.addEventListener('load', updateScroll);
        return () => img.removeEventListener('load', updateScroll);
      }
    }
  }, [images, page]);

  return (
    <div>
      <SearchBar onSearch={handleSearchSubmit} />
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
          },
        }}
      />
      {images.length > 0 && (
        <ImageGallery
          images={images}
          openModal={openModal}
          ref={galleryRef}
          lastElementRef={lastElementRef}
        />
      )}
      {isLoading && <Loader />}
      {error && <ErrorMessage message={error} />}
      {hasMoreImages && !isLoading && <LoadMoreBtn onClick={handleLoadMore} />}
      {selectedImage && <ImageModal isOpen={true} onClose={closeModal} image={selectedImage} />}
      {!selectedImage && <ScrollToTopButton />}
    </div>
  );
}