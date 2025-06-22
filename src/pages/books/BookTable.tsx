import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Pagination,
  Typography,
  TextField,
  FormControl,
  Select,
  MenuItem,
  tableCellClasses,
  styled,
  SelectChangeEvent,
} from "@mui/material";
import { BookPropType } from "../../types/books/book.type";
import { useLibrary } from "../../context/LibraryContext";
import { FcAddImage } from "react-icons/fc";
import { FaCircleInfo, FaTrash } from "react-icons/fa6";
import { handleApiError } from "../../utils/handleApiErrors";
import { FaEdit } from "react-icons/fa";
import {ImageUploaderModal, VerticallyCenteredModal, FavoriteButton, ExportCVS, ExportPDF, handlError} from "../../components";
import "./BookTable.css";

const BookTable = () => {
  //context
  const { getBooksFromDb, books, deleteBookById } = useLibrary();

  //states
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [totalCount, setTotalCount] = useState(0);
  const [activeModal, setActiveModal] = useState<{
    type: "delete" | "image" | null;
    bookId: string | null;
  } | null>(null);
  const [bookToDelete, setBookToDelete] = useState<BookPropType | null>(null);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

//efects
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 400);

    return () => clearTimeout(handler);
  }, [search]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getBooksFromDb(page, limit, debouncedSearch);
        setTotalCount(result.totalCount);
      } catch (error) {
        handlError("Error " + error);
      }
    };

    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, limit, debouncedSearch]);

  // Funcion creada para hacer un fetch de los books cuando se actualice un valor de los mismos y actualizar el ui con el ultimo cambio sin recargar la pagina
  const reRenderBooks = async () => {
    await getBooksFromDb(page, limit);
  }

  const handleChangePage = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const handleLimitChange = (event: SelectChangeEvent<number>) => {
    console.log(Number(event.target.value))
    setLimit(Number(event.target.value));
    setPage(1);
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
      const errorMessage = handleApiError(error);
      handlError(errorMessage);
    }
  };

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
      fontWeight: 600,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  // para sacar la cantidad de pagina se divide cantidad de items entre el limite y eso da la cantidad de paginas
  const totalPages = Math.ceil(totalCount / limit);
  
  /* 
    showFavoritesOnly es falso por defecto y como se usa el operador de negacion ! se vuelve true y filtra todos los libros
    y cuando se le da al buton se pone true pero con el operador de negacion ! se vuelve false entonces va a la siguiente condicion 
    y filtra todos los libros favoritos.
  */
  const filteredBooks = books?.data?.filter((book) => !showFavoritesOnly || book.isFavorite === 1) || [];


  return (
    <div className="w-full max-w-6xl mx-auto mt-6">
      <div className="flex justify-between items-center mb-4 gap-2 flex-wrap">
        <Typography variant="h5">Book List</Typography>
        <div className="flex gap-2">
        <Link to={"/create"} className="btn-create">
          Create new book
        </Link>
        {/* Cuando le das click a el btn show favorites busca el ultima estado de showFavoritesOnly y le cambia el valor a su opuesto si es true, lo pone en false. 
            y si es false, lo pone en true. */}
          <button className={`btn-export ${showFavoritesOnly ? "bg-yellow-300 text-white" : ""}`} onClick={() => setShowFavoritesOnly((prevState) => !prevState)}>
            {showFavoritesOnly ? "Show All" : "Show Favorites"}
          </button>
          <ExportCVS books={books}/>
          <ExportPDF books={books} />
        </div>
        <TextField
          label="Search books..."
          variant="outlined"
          size="small"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <TableContainer component={Paper} className="table-wrapper">
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell>Title</StyledTableCell>
              <StyledTableCell>Author</StyledTableCell>
              <StyledTableCell>Year</StyledTableCell>
              <StyledTableCell>Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredBooks.length > 0  ? (
              filteredBooks.map((book: BookPropType, index: number) => (
                <TableRow key={book.id}>
                  <TableCell>{book.id}</TableCell>
                  <TableCell>{book.title}</TableCell>
                  <TableCell>{book.author}</TableCell>
                  <TableCell>{book.year}</TableCell>
                  <TableCell>
                    <div className="icons-container">
                      <VerticallyCenteredModal
                        show={
                          activeModal?.type === "delete" &&
                          activeModal.bookId === book.id
                        }
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
                          setActiveModal({ type: "delete", bookId: book.id });
                        }}
                      >
                        <FaTrash />
                      </button>

                      <Link to={`/detail/${book.id}`} className="btn-info">
                        <FaCircleInfo />
                      </Link>

                      <FavoriteButton book={book} index={index} reRenderBooks={reRenderBooks}/>

                      <ImageUploaderModal
                        show={
                          activeModal?.type === "image" &&
                          activeModal.bookId === book.id
                        }
                        onHide={() => setActiveModal(null)}
                        book={book}
                        reRenderBooks={reRenderBooks}
                      />

                      <button
                        onClick={() => {
                          setActiveModal({ type: "image", bookId: book.id });
                        }}
                      >
                        <FcAddImage />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No books found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <div className="sticky-footer flex justify-between items-center mt-4">
        <div className="flex items-center gap-2">
          <span>Rows per page:</span>
          <FormControl size="small">
            <Select value={limit} onChange={handleLimitChange}>
              {[5, 25, 50].map((qty) => (
                <MenuItem key={qty} value={qty}>
                  {qty}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        {totalPages > 1 && (
          <Pagination
            count={totalPages}
            page={page}
            onChange={handleChangePage}
            variant="outlined"
            shape="rounded"
          />
        )}
      </div>
    </div>
  );
};

export default BookTable;
