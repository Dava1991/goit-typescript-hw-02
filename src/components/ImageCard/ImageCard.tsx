import css from "./ImageCard.module.css";
export default function ImageCard({ picture, onModalOpen }) {
  return (
    <div onClick={() => onModalOpen(picture)}>
      <img
        className={css.image}
        src={picture.urls.small}
        alt={picture.alt_description}
      />
    </div>
  );
}