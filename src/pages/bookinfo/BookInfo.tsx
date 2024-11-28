import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useLibrary } from "../../context/LibraryContext";
import { BookPropType } from "../../types/books/book.type";
import './BookInfo.css'


const BookInfo = () => {
    const { id } = useParams();
    const parsedId = Number(id);

    const [book, setBook] = useState<BookPropType | null>(null)
    const [isLoading, setisLoading] = useState<boolean>(true)
    const { getOneBook } = useLibrary()

    useEffect(() => {
        async function data() {
            try {
                const bookById = await getOneBook(parsedId);
                setBook(bookById)
                setisLoading(false);
            } catch (error) {
                console.log(error)
            }
        }

        data();
    }, [])

    function handleEdit() {
    }
    return (
        <div>
            {book ? (
                <div className="table_container">

                    <div className="book-info">
                        <p className="book_title"><strong>Title:</strong> {book.title}</p>
                        <p className="book_title"><strong>Author:</strong> {book.author}</p>
                        <p className="book_title"><strong>Year:</strong> {book.year}</p>
                        <p className="book_title"><strong>Genre:</strong> {book.genre}</p>
                        <p className="book_title"><strong>Favorite:</strong> {book.isFavorite === 1 ? "Marked as favorite" : "It has not been marked as favorite"}</p>
                        <p className="book_title"><strong>Date of creation:</strong> {book.createdAt}</p>
                        <p className="book_title"><strong>Last time it was updated:</strong> {book.updatedAt !== null ? book.updatedAt : "It has not been updated yet"}</p>
                        <h2 className="button_title">Actions</h2>
                        <div className="button_container">
                            <button className="btn btn-warning" onClick={handleEdit}>Edit</button>
                        </div>
                    </div>

                </div>
            ) : (
                isLoading && <div>Loading...</div>
            )}
        </div>
    )

}
export default BookInfo