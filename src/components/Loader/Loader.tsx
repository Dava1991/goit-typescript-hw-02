import { InfinitySpin } from 'react-loader-spinner';
import css from './Loader.module.css';

export default function Loader() {
  return (
    <div className={css.container}>
      <InfinitySpin
        visible={true}
        width="190"
        color="rgb(89, 89, 236)"
        ariaLabel="infinity-spin-loading"
      />
    </div>
  );
}