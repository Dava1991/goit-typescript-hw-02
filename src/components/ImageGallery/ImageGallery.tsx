import ImageCard from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css";
export default function ImageGallery({ resultsArr, onModalOpen }) {
  return (
    <ul className={css.list}>
      {resultsArr.map((image) => (
        <li className={css.item} key={image.id}>
          <ImageCard picture={image} onModalOpen={onModalOpen} />
        </li>
      ))}
    </ul>
  );
}