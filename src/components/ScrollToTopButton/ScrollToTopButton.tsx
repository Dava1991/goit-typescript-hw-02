import { useState, useEffect, useCallback } from 'react';
import { BsRocket } from 'react-icons/bs';
import css from './ScrollToTopButton.module.css';

export default function ScrollToTopButton({ closeModal }) {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = useCallback(() => {
    if (window.pageYOffset > 30 && !document.body.classList.contains('modal-open')) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === 'Escape') {
        if (document.body.classList.contains('modal-open')) {
          closeModal();
        }
        toggleVisibility();
      }
    },
    [closeModal, toggleVisibility],
  );

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [toggleVisibility, handleKeyDown]);

  const isModalOpen = document.body.classList.contains('modal-open');

  useEffect(() => {
    toggleVisibility();
  }, [toggleVisibility, isModalOpen]);

  return (
    <div>
      {isVisible && (
        <button className={css.scrollToTopButton} onClick={scrollToTop}>
          <BsRocket size="30" />
        </button>
      )}
    </div>
  );
}