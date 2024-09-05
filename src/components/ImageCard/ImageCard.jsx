import css from './ImageCard.module.css';

export default function ImageCard({ image, openModal }) {
  return (
    <div className={css.container}>
      <img
        className={css.img}
        src={image.urls.small}
        alt={image.description}
        onClick={() => openModal(image)}
      />

      <div className={css.thumb}>
        <div className={css.meta}>
          <p className={css.title}>Name:</p>
          <p className={css.info}>{image.user.name}</p>
        </div>
        <div>
          <p className={css.title}>Likes:</p>
          <p className={css.info}>{image.likes}</p>
        </div>
      </div>
    </div>
  );
}