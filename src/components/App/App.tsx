import { useEffect, useState, useCallback, useRef } from 'react';
import { fetchImages } from '../images-api.tsx';
import { Toaster, toast } from 'react-hot-toast';

import SearchBar from '../SearchBar/SearchBar.tsx';
import Loader from '../Loader/Loader.tsx';
import ErrorMessage from '../ErrorMessage/ErrorMessage.tsx';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn.tsx';
import ImageGallery from '../ImageGallery/ImageGallery.tsx';
import ImageModal from '../ImageModal/ImageModal.tsx';
import ScrollToTopButton from '../ScrollToTopButton/ScrollToTopButton.tsx';
import { Image, ModalParams, SearchResults } from "../types";

export default function App() {
  const [query, setQuery] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [images, setImages] = useState<Image[]>([]);
  const [selectedImage, setSelectedImage] = useState<boolean>(false);
  const [hasMoreImages, setHasMoreImages] = useState<boolean>(false);

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