import toast from 'react-hot-toast';
import { TbPhotoSearch } from 'react-icons/tb';
import css from './SearchBar.module.css';

export default function SearchBar({ onSearch }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const query = form.elements.query.value.trim();
    if (query === '') {
      toast.error('This field cannot be empty! Please write something.🖊️');
      return;
    }
    onSearch(query);
    form.reset();
  };
  return (
    <header className={css.header}>
      <form className={css.form} onSubmit={handleSubmit}>
        <input
          className={css.input}
          type="text"
          name="query"
          autoComplete="off"
          autoFocus
          placeholder="Search images..."
        />
        <button className={css.btn} type="submit">
          <TbPhotoSearch size="22" />
        </button>
      </form>
    </header>
  );
}