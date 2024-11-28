import { useEffect, useState } from "react";
import { BookPropType } from "../../types/books/book.type";
import { FaEdit, FaTrash } from "react-icons/fa";
import { FaCircleInfo } from "react-icons/fa6";
import { useLibrary } from "../../context/LibraryContext";
import "./BookTable.css";
import { VerticallyCenteredModal } from "../../components/VerticallyCenteredModal/VerticallyCenteredModal";
import { Link } from "react-router-dom";

export default function BookTable() {

  const [searchTerm, setSearchTerm] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [bookToDelete, setBookToDelete] = useState<BookPropType | null>(null);
  const { getBooksFromDb, books, deleteBookById } = useLibrary()

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const confirmDelete = async () => {
    if (bookToDelete) {
      await deleteBookById(Number(bookToDelete.id));
      setModalShow(false);  
      setBookToDelete(null); 
    }
  };


  useEffect(() => {
    const debounce = setTimeout(() => {
      getBooksFromDb(searchTerm);
    }, 300);
    return () => clearTimeout(debounce);
  }, [searchTerm, books]);

  return (
    <div className="table_container">

      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search books..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      <table className="table">
        <thead className="table-dark">
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Title</th>
            <th scope="col">Author</th>
            <th scope="col">Year</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            books?.map((book) => (
              <tr key={book.id}>
                <th>{book.id}</th>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.year}</td>
                <td>
                  <VerticallyCenteredModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    onConfirm={confirmDelete}
                    message="¿Estás seguro de que quieres eliminar este libro?"
                  />
                  <button className="btn-edit" >
                    <FaEdit />
                  </button>
                  <button className="btn-delete" onClick={() => {
                    setBookToDelete(book);
                    setModalShow(true);
                  }}>
                    <FaTrash />
                  </button>

                  <Link to={`/detail/${book.id}`} className="btn-info">
                    <FaCircleInfo />
                  </Link>

                </td>
              </tr>
            ))
          }
        </tbody>
      </table>

    </div>
  );
}