import {
    createContext,
    PropsWithChildren,
    useContext,
    useEffect,
    useState,
} from "react";
import { deleteBook, editBook, getAllBooks, getBook } from "../services/apiFunctions";
import { ApiResponseProp, BookPropType } from "../types/books/book.type";


export type LibraryContextValue = {
    books: BookPropType[] | null;
    getBooksFromDb: (searchTerm: string) => Promise<ApiResponseProp<BookPropType[]>>;
    edit: (data: BookPropType, id: number) => Promise<void>;
    getOneBook: (id: number) => Promise<BookPropType>
    deleteBookById: (id: number) => Promise<void>
};


export const LibraryContext = createContext<LibraryContextValue>({
    books: null,
    getBooksFromDb: async () => {
        throw new Error("getBooksFromDb must be called within a LibraryProvider");
    },
    edit: async () => {},
    getOneBook: async () => {throw new Error("getOneBook must be called within a LibraryProvider");},
    deleteBookById: async () => {}
});

export const LibraryProvider = ({ children }: PropsWithChildren) => {

    const [books, setBooks] = useState<BookPropType[] | null>(null);

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
