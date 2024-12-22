import { BookPropType } from "../types/books/book.type";

export const arrayConvertionFn = (book: BookPropType | null) => {
    if (Array.isArray(book?.genre)) {
        return book.genre;  // If it's already an array, use it
    }

    if (typeof book?.genre === "string") {
        try {
            // Attempt to parse JSON if it's a string
            const parsedGenre = JSON.parse(book.genre);
            if (Array.isArray(parsedGenre)) {
                return parsedGenre;  // If it's a valid array, return it
            }
        } catch (e) {
            console.error("Error parsing genre JSON", e);
        }
    }

    return [];  // Return an empty array if it's neither an array nor valid JSON
};