import { useEffect, useState } from "react";
import { BookPropType } from "../../types/books/book.type";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useLibrary } from "../../context/LibraryContext";
import "./BookTable.css";
import { VerticallyCenteredModal } from "../../components/VerticallyCenteredModal/VerticallyCenteredModal";

export default function BookTable() {

  const [searchTerm, setSearchTerm] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const { getBooksFromDb, books } = useLibrary()

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const triggerEditModal = (book: BookPropType) => {
    console.log(book)
    setModalShow(true)
  }

 useEffect(() => {
  const debounce = setTimeout(() => {
    getBooksFromDb(searchTerm);
  }, 300); 
  return () => clearTimeout(debounce);
}, [searchTerm]); 

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
                <VerticallyCenteredModal show={modalShow} onHide={() => setModalShow(false)}/>
                  <button className="btn-edit" onClick={() => triggerEditModal(book)}>
                    <FaEdit />
                  </button>
                  <button className="btn-delete">
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>

    </div>
  );
}