import { useEffect } from "react";
import ReactModal from "react-modal";
import Loader from "../Loader/Loader";
import css from "./ImageModal.module.css";
// import "./ImageModal.css";
export default function ImageModal({ isOpen, onClose, modalData }) {
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.code === "Escape" && isOpen) {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      ariaHideApp={true}
      shouldCloseOnEsc={true}
      shouldCloseOnOverlayClick={true}
      overlayClassName={css.overlay}
      className={css.modal}
      style={{
        overlay: {
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.712)",
        },
        content: {
          position: "absolute",
          top: "40px",
          left: "40px",
          right: "40px",
          bottom: "40px",
          // overflow: "auto",
          WebkitOverflowScrolling: "touch",
          borderRadius: "4px",
          outline: "none",
        },
      }}
    >
      <div>
        {modalData ? (
          <img
            className={css.image}
            src={modalData && modalData.urls.regular}
            alt={modalData && modalData.urls.alt_description}
          />
        ) : (
          <Loader />
        )}
      </div>
    </ReactModal>
  );
}