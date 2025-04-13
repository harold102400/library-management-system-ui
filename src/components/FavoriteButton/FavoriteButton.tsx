import { useRef } from "react";
import { useLibrary } from "../../context/LibraryContext";
import { BookPropType } from "../../types/books/book.type";
import { ImStarFull } from "react-icons/im";

type FavoriteButtonProps = {
  book: BookPropType;
  index: number;
};

const FavoriteButton = ({ book, index }: FavoriteButtonProps) => {
  const { isFavoriteBook, getOneBook, setBooks } = useLibrary();

  const myRef = useRef<(HTMLButtonElement | null)[]>([]);

  const handleFavoriteState = (book: BookPropType) => {
    setBooks((prevBooks) => {
      if (prevBooks === null) {
        return null; 
      }
      const updatedBooks = prevBooks.data.map((prevBook) => {
        return prevBook.id === book.id
          ? { ...prevBook, isFavorite: book.isFavorite }
          : prevBook;
      });
      return { ...prevBooks, data: updatedBooks };
    });
  };

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

      //se obtiene del contexto el libro con el dato actualizado
      const updatedBookResponse = await getOneBook(Number(book.id));

      //se agrega al estado para react renderice la pagina con el nuevo cambio
      handleFavoriteState({
        ...book,
        isFavorite: updatedBookResponse.isFavorite,
      });
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
