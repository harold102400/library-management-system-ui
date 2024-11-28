import { useEffect, useState } from "react";
import { BookPropType } from "../../types/books/book.type";
import { FaEdit, FaTrash } from "react-icons/fa";
import { FaCircleInfo } from "react-icons/fa6";
import { useLibrary } from "../../context/LibraryContext";
import { VerticallyCenteredModal } from "../../components/VerticallyCenteredModal/VerticallyCenteredModal";
import { Link } from "react-router-dom";
import "./BookTable.css";
import { handlError } from "../../components/ErrorAlert/ErrorAlert";

export default function BookTable() {

  const [searchTerm, setSearchTerm] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [bookToDelete, setBookToDelete] = useState<BookPropType | null>(null);
  const { getBooksFromDb, books, deleteBookById } = useLibrary()

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const confirmDelete = async () => {
   try {
    if (bookToDelete) {
      await deleteBookById(Number(bookToDelete.id));
      setModalShow(false);  
      setBookToDelete(null); 
    }
   } catch (error: any) {
    handlError(error?.response?.data?.message)
   }
  };
  
  useEffect(() => {
    const debounce = setTimeout(() => {
      getBooksFromDb(searchTerm);
    }, 300);
    return () => clearTimeout(debounce);
  }, [searchTerm]);

  return (
    <div className="table_container">
      <div className="search-container">
        <Link to={"/create"} className="btn-create">Create new book</Link>
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
                    message="Are you sure you want to delete this book?"
                  />
                    <Link to={`/edit/${book.id}`} className="btn-edit">
                    <FaEdit />
                    </Link>
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