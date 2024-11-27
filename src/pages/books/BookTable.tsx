import { useEffect, useState } from "react";
import { getAllBooks } from "../../services/apiFunctions";
import { ApiResponseProp, BookPropType } from "../../types/books/book.type";
import { FaEdit, FaTrash } from "react-icons/fa";
import "./BookTable.css";

export default function BookTable() {


  const [books, setBooks] = useState<BookPropType[] | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

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
          <tr>
            <th></th>
            <td></td>
            <td></td>
            <td></td>
            <td>
              <button className="btn-edit">
                <FaEdit />
              </button>
              <button className="btn-delete">
                <FaTrash />
              </button>
            </td>
          </tr>
        </tbody>
      </table>

    </div>
  );
}