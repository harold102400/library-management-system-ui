import { useRef } from "react";
import { useLibrary } from "../../context/LibraryContext";
import { BookPropType } from "../../types/books/book.type";
import { ImStarFull } from "react-icons/im";

type FavoriteButtonProps = {
  book: BookPropType;
  index: number;
  reRenderBooks: () => Promise<void>
};

const FavoriteButton = ({ book, index, reRenderBooks }: FavoriteButtonProps) => {
  const { isFavoriteBook } = useLibrary();

  const myRef = useRef<(HTMLButtonElement | null)[]>([]);

  const handleFavorite = async (index: number): Promise<void> => {
    const button = myRef.current[index];

    if (button) {
      if (button.classList.contains("btn-favorite-active")) {
        button.classList.remove("btn-favorite-active");
        button.classList.add("btn-favorite");
      } else {
        button.classList.add("btn-favorite-active");
        button.classList.remove("btn-favorite");
      }
      await isFavoriteBook(book);
      reRenderBooks()
    }
  };

  return (
    <button
      onClick={() => handleFavorite(index)}
      className={`btn-favorite ${
        book.isFavorite === 1 ? "btn-favorite-active" : ""
      }`}
      ref={(el) => (myRef.current[index] = el)}
    >
      <ImStarFull />
    </button>
  );
};

export default FavoriteButton;
