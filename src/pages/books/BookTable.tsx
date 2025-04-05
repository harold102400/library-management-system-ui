import { useEffect, useState, useRef } from "react";
import { BookPropType } from "../../types/books/book.type";
import { FaEdit, FaTrash } from "react-icons/fa";
import { ImStarFull  } from "react-icons/im";
import { FaCircleInfo } from "react-icons/fa6";
import { useLibrary } from "../../context/LibraryContext";
import { VerticallyCenteredModal } from "../../components/VerticallyCenteredModal/VerticallyCenteredModal";
import { Link, useSearchParams} from "react-router-dom";
import ReactPaginate from "react-paginate";
import "./BookTable.css";
import { handlError } from "../../components/ErrorAlert/ErrorAlert";

export default function BookTable() {

  const [searchTerm, setSearchTerm] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [bookToDelete, setBookToDelete] = useState<BookPropType | null>(null);
  // const [isFavorite, setIsFavorite] = useState<number>(0);
  const { getBooksFromDb, books, deleteBookById } = useLibrary()
  // const myRef= useRef<HTMLButtonElement | null>(null);
  const myRef = useRef<(HTMLButtonElement | null)[]>([]);

  const { isFavoriteBook } = useLibrary();


  

  const [pageCount, setPageCount] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams({
    page: "1",
    limit: "5",
  });

  const changePage = ({ selected }: { selected: number }) => {
    const page = selected + 1; // páginas empiezan desde 0 en ReactPaginate
    setSearchParams({ page: String(page), limit: "5" });
    getPaginatedProducts(page, 5);
  };
  

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  
  const getPaginatedProducts = async (page: number, limit: number, searchProduct: string = "") => {
    try {
      const allBooks = await getBooksFromDb(page, limit, searchProduct);
      setPageCount(Math.ceil(allBooks.totalCount / allBooks.limit));
      setSearchParams({
        page: String(allBooks.page),
        limit: String(allBooks.limit),
      });
    } catch (error) {
      if (error instanceof Error) {
        // handleError(error.message);
      }
    } 
  };

  const confirmDelete = async () => {
   try {
    if (bookToDelete) {
      await deleteBookById(Number(bookToDelete.id));
      setModalShow(false);  
      setBookToDelete(null); 
      window.location.reload();
    }
   } catch (error: any) {
    handlError(error?.response?.data?.message)
   }
  };

  const handleFavorite = async (bookId: number, index: number): Promise<void> => {
    const button = myRef.current[index]; 

    if (button) {
      if (button.classList.contains('btn-favorite-active')) {
        button.classList.remove('btn-favorite-active');
        button.classList.add('btn-favorite');
      } else {
        button.classList.add('btn-favorite-active');
        button.classList.remove('btn-favorite');
      }
      await isFavoriteBook(bookId);
    }
  }

  useEffect(() => {
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 5;
    getPaginatedProducts(page, limit);
  }, [searchParams]);
  

  
  useEffect(() => {
    const debounce = setTimeout(() => {
      const page = Number(searchParams.get("page")) || 1;
      const limit = Number(searchParams.get("limit")) || 5;
      getPaginatedProducts(page, limit, searchTerm);
    }, 300);
    return () => clearTimeout(debounce);
  }, [searchTerm, searchParams]);  // Dependencias corregidas
  
  return (
    <div className="table_container">
      <div className="search-container">
        <Link to={"/create"} className="btn-create">
          Create new book
        </Link>
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
          {books?.data?.map((book, index) => (
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
                <button
                  className="btn-delete"
                  onClick={() => {
                    setBookToDelete(book);
                    setModalShow(true);
                  }}
                >
                  <FaTrash />
                </button>

                <Link to={`/detail/${book.id}`} className="btn-info">
                  <FaCircleInfo />
                </Link>
                <button onClick={() =>handleFavorite(Number(book.id), index)} className={`btn-favorite ${book.isFavorite === 1 ? 'btn-favorite-active' : ''}`} ref={(el) => (myRef.current[index] = el)}>
                  <ImStarFull  />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={"paginationBttns"}
        previousLinkClassName={"previousBttn"}
        nextLinkClassName={"nextBttn"}
        disabledClassName={"paginationDisabled"}
        activeClassName={"active"}
      />
    </div>
  );
}