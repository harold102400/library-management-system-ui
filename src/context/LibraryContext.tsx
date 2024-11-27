import {
    createContext,
    PropsWithChildren,
    useContext,
    useEffect,
    useState,
} from "react";
import { getAllBooks } from "../services/apiFunctions";
import { ApiResponseProp, BookPropType } from "../types/books/book.type";


export type LibraryContextValue = {
    getBooksFromDb: (searchTerm: string) => Promise<ApiResponseProp<BookPropType[]>>;
};


export const LibraryContext = createContext<LibraryContextValue>({
    getBooksFromDb: async () => {
        throw new Error("getBooksFromDb must be called within a LibraryProvider");
    },
});

export const LibraryProvider = ({ children }: PropsWithChildren) => {

    const getBooksFromDb = async (searchTerm: string): Promise<ApiResponseProp<BookPropType[]>> => {
        try {
            const books = await getAllBooks(searchTerm);
            return books;
        } catch (error) {
            throw error;
        }
    }

    const value: LibraryContextValue = {
        getBooksFromDb,
    };

    return <LibraryContext.Provider value={value}>{children}</LibraryContext.Provider>;
};

export const useLibrary = () => {
    const context = useContext(LibraryContext);
    if (!context) throw new Error("useAuth must be used within an AuthProvider");
    return context;
};

export default LibraryContext;
