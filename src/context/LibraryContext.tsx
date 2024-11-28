import {
    createContext,
    PropsWithChildren,
    useContext,
    useState,
} from "react";
import { deleteBook, editBook, getAllBooks, getBook } from "../services/apiFunctions";
import { ApiResponseProp, BookPropType } from "../types/books/book.type";


export type LibraryContextValue = {
    books: BookPropType[];
    book: BookPropType | null;
    getBooksFromDb: (searchTerm: string) => Promise<ApiResponseProp<BookPropType[]>>;
    edit: (data: BookPropType, id: number) => Promise<void>;
    getOneBook: (id: number) => Promise<BookPropType>
    deleteBookById: (id: number) => Promise<void>
};


export const LibraryContext = createContext<LibraryContextValue | null>(null);

export const LibraryProvider = ({ children }: PropsWithChildren) => {

    const [books, setBooks] = useState<BookPropType[]>([]);
    const [book, setBook] = useState<BookPropType | null>(null)

    const getBooksFromDb = async (searchTerm: string): Promise<ApiResponseProp<BookPropType[]>> => {
        try {
            const books = await getAllBooks(searchTerm);
            setBooks(books.data)
            return books;
        } catch (error) {
            throw error;
        }
    }

    const getOneBook = async (id: number): Promise<BookPropType> =>{
        const response = await getBook(id)
        setBook(response)
        return response;
    } 

    const edit = async (book: BookPropType, bookId: number) =>{
        await editBook(book, bookId)
    } 

    const deleteBookById = async (id: number): Promise<void> =>{
        await deleteBook(id)
    } 
  
    const value: LibraryContextValue = {
        books,
        book,
        getBooksFromDb,
        edit,
        getOneBook,
        deleteBookById
    };

    return <LibraryContext.Provider value={value}>{children}</LibraryContext.Provider>;
};

export const useLibrary = () => {
    const context = useContext(LibraryContext);
    if (!context) throw new Error("useAuth must be used within an AuthProvider");
    return context;
};

export default LibraryContext;
