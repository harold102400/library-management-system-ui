import {
    createContext,
    Dispatch,
    PropsWithChildren,
    SetStateAction,
    useContext,
    useState,
} from "react";
import { deleteBook, editBook, getAllBooks, getBook, isFavorite } from "../services/apiFunctions";
import { ApiResponseProp, BookPropType } from "../types/books/book.type";


export type LibraryContextValue = {
    books: ApiResponseProp<BookPropType[]> | null;
    book: BookPropType | null;
    getBooksFromDb: (page:number, limit: number, searchTerm?: string) => Promise<ApiResponseProp<BookPropType[]>>;
    edit: (data: BookPropType, id: number) => Promise<void>;
    getOneBook: (id: number) => Promise<BookPropType>;
    deleteBookById: (id: number) => Promise<void>;
    isFavoriteBook: (book: BookPropType) => Promise<void>;
    setBooks: Dispatch<SetStateAction<ApiResponseProp<BookPropType[]> | null>>;
};


export const LibraryContext = createContext<LibraryContextValue | null>(null);

export const LibraryProvider = ({ children }: PropsWithChildren) => {

    const [books, setBooks] = useState<ApiResponseProp<BookPropType[]> | null>(null);
    const [book, setBook] = useState<BookPropType | null>(null)

    const getBooksFromDb = async (page:number, limit: number, searchTerm: string = ""): Promise<ApiResponseProp<BookPropType[]>> => {
            const books = await getAllBooks(page, limit, searchTerm);
            setBooks(books)
            return books;
       
    }

    const getOneBook = async (id: number): Promise<BookPropType> =>{
        const response = await getBook(id)
        setBook(response)
        return response;
    } 

    const edit = async (book: BookPropType, bookId: number) =>{
        await editBook(book, bookId)
    } 

    const isFavoriteBook = async (book: BookPropType) => {
        if (!book) return;
        const newFavoriteStatus = book.isFavorite === 0 ? 1 : 0;
        await isFavorite(newFavoriteStatus, Number(book.id));
        setBook({ ...book, isFavorite: book.isFavorite });
      };
      
    const deleteBookById = async (id: number): Promise<void> =>{
        await deleteBook(id)
    } 
  
    const value: LibraryContextValue = {
        books,
        book,
        getBooksFromDb,
        edit,
        getOneBook,
        deleteBookById,
        isFavoriteBook,
        setBooks
    };

    return <LibraryContext.Provider value={value}>{children}</LibraryContext.Provider>;
};

export const useLibrary = () => {
    const context = useContext(LibraryContext);
    if (!context) throw new Error("useAuth must be used within an AuthProvider");
    return context;
};

export default LibraryContext;
