import css from "./LoadMoreBtn.module.css";
export default function LoadMoreButton({ onLoadMore }) {
  return (
    <div>
      <button className={css.button} onClick={onLoadMore}>
        Load more
      </button>
    </div>
  );
}