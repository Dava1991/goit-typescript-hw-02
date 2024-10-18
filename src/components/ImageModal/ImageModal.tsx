import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { IoCloseOutline } from 'react-icons/io5';
import css from './ImageModal.module.css';

Modal.setAppElement('#root');

export default function ImageModal({ isOpen, onClose, image }) {
  const [scrollbarWidth, setScrollbarWidth] = useState(0);

  useEffect(() => {
    const calculateScrollbarWidth = () => {
      const scrollWidth = window.innerWidth - document.documentElement.clientWidth;
      setScrollbarWidth(scrollWidth);
      document.documentElement.style.setProperty('--scrollbar-width', `${scrollWidth}px`);
    };

    calculateScrollbarWidth();
    window.addEventListener('resize', calculateScrollbarWidth);

    return () => {
      window.removeEventListener('resize', calculateScrollbarWidth);
    };
  }, []);

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = window.getComputedStyle(document.body).paddingRight;

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
    }

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
    };
  }, [isOpen, scrollbarWidth]);

  if (!image) return null;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={css.modalContent}
      overlayClassName={css.modalOverlay}
      contentLabel="Image Modal"
      shouldCloseOnOverlayClick={true}
    >
      <div className={css.wrapper}>
        <img src={image.urls.regular} alt={image.tags} className={css.img} />
        <button onClick={onClose} className={css.btn}>
          <IoCloseOutline size="30px" />
        </button>
        <div className={css.thumb}>
          <div className={css.meta}>
            <p className={css.info}>
              <span className={css.title}>Description:</span> {image.alt_description}
            </p>
            <p className={css.info}>
              <span className={css.title}>Location:</span> {image.user.location}
            </p>
          </div>
        </div>
      </div>
    </Modal>
  );
}