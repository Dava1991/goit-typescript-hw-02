import { BsSearch } from "react-icons/bs";
import css from "./SearchBar.module.css";
import toast from "react-hot-toast";
import { FormEvent } from "react";

export default function SearchBar({ onSubmit }) {
  const handleInputSubmit = (event: FormEvent) => {
    event.preventDefault();

    const query: string = event.target.elements.searchword.value.trim();

    if (!query) {
      toast.error("Write your query, please!", {
        duration: 4000,
        position: "top-left",
        style: { color: "red" },
      });
      return;
    }
    onSubmit(query);
  };
  return (
    <header className={css.header}>
      <form className={css.form} onSubmit={handleInputSubmit}>
        <input
          type="text"
          className={css.input}
          name="searchword"
          placeholder="Search images and photos"
        />
        <button className={css.button} type="submit">
          <BsSearch className={css.iconbtn} />
        </button>
      </form>
    </header>
  );
}