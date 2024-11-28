import {
    createContext,
    PropsWithChildren,
    useContext,
    useEffect,
    useState,
} from "react";
import { editBook, getAllBooks } from "../services/apiFunctions";
import { ApiResponseProp, BookPropType } from "../types/books/book.type";


export type LibraryContextValue = {
    books: BookPropType[] | null;
    getBooksFromDb: (searchTerm: string) => Promise<ApiResponseProp<BookPropType[]>>;
    edit: (data: BookPropType, id: number) => Promise<void>;
};


export const LibraryContext = createContext<LibraryContextValue>({
    books: null,
    getBooksFromDb: async () => {
        throw new Error("getBooksFromDb must be called within a LibraryProvider");
    },
    edit: async () => {}
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

    const edit = async (book: BookPropType, bookId: number) =>{
        await editBook(book, bookId)
    } 
  
    const value: LibraryContextValue = {
        books,
        getBooksFromDb,
        edit
    };

    return <LibraryContext.Provider value={value}>{children}</LibraryContext.Provider>;
};

export const useLibrary = () => {
    const context = useContext(LibraryContext);
    if (!context) throw new Error("useAuth must be used within an AuthProvider");
    return context;
};

export default LibraryContext;
