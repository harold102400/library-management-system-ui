import { useEffect, useState } from "react";
import { BookPropType } from "../../types/books/book.type";
import { FaEdit, FaTrash } from "react-icons/fa";
import { FaCircleInfo } from "react-icons/fa6";
import { FcAddImage } from "react-icons/fc";
import { useLibrary } from "../../context/LibraryContext";
import { VerticallyCenteredModal } from "../../components/VerticallyCenteredModal/VerticallyCenteredModal";
import { Link, useSearchParams} from "react-router-dom";
import ReactPaginate from "react-paginate";
import { handlError } from "../../components/ErrorAlert/ErrorAlert";
import { ImageUploaderModal } from "../../components/ImageUploaderModal/ImageUploaderModal";
import FavoriteButton from "../../components/FavoriteButton/FavoriteButton";
import "./BookTable.css";
import { handleApiError } from "../../utils/handleApiErrors";

export default function BookTable() {

  const [pageCount, setPageCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeModal, setActiveModal] = useState<{
    type: 'delete' | 'image' | null;
    bookId: string | null;
  } | null>(null);
  const [bookToDelete, setBookToDelete] = useState<BookPropType | null>(null);
  const { getBooksFromDb, books, deleteBookById,  } = useLibrary()


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
      setActiveModal(null);  
      setBookToDelete(null); 
      window.location.reload();
    }
   } catch (error: unknown) {
    const errorMessage = handleApiError(error)
    handlError(errorMessage)
   }
  };


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
                  show={activeModal?.type === 'delete' && activeModal.bookId === book.id}
                  onHide={() => setActiveModal(null)}
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
                    setActiveModal({ type: 'delete', bookId: book.id });
                  }}
                >
                  <FaTrash />
                </button>

                <Link to={`/detail/${book.id}`} className="btn-info">
                  <FaCircleInfo />
                </Link>
                
                <FavoriteButton book={book} index={index}/>

                <ImageUploaderModal
                  show={activeModal?.type === 'image' && activeModal.bookId === book.id}
                  onHide={() => setActiveModal(null)}
                  book={book}
                />

                <button
                  onClick={() => {
                    setActiveModal({ type: 'image', bookId: book.id });
                  }}
                >
                  <FcAddImage />
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