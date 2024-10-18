import { forwardRef } from 'react';
import css from './ImageGallery.module.css';
import ImageCard from '../ImageCard/ImageCard';

const ImageGallery = forwardRef(({ images, openModal, lastElementRef }, ref) => (
  <ul className={css.container} ref={ref}>
    {images.map((image, index) => (
      <li key={image.id} ref={index === images.length - 1 ? lastElementRef : null}>
        <ImageCard image={image} openModal={openModal} />
      </li>
    ))}
  </ul>
));

ImageGallery.displayName = 'ImageGallery';

export default ImageGallery;