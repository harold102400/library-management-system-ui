import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useLibrary } from "../../context/LibraryContext";
import { arrayConvertionFn } from "../../utils/arrayConvertionFn";
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';
import notCoverImageAvailable from "../../assets/Image_not_available.png";
import './BookInfo.css'


const BookInfo = () => {

    const { id } = useParams();
    const parsedId = Number(id);
    const [isLoading, setisLoading] = useState<boolean>(true)
    const { getOneBook, book } = useLibrary();
    const genresArray = arrayConvertionFn(book);
    dayjs.extend(relativeTime);
    const bookCreatedTime = dayjs(book?.createdAt).fromNow();
    const bookUpdatedTime = dayjs(book?.updatedAt).fromNow();

    useEffect(() => {
        async function data() {
            try {
                await getOneBook(parsedId);
                setisLoading(false);
            } catch (error) {
                console.log(error)
            }
        }

        data();
    }, [])

    return (
        <div>
            {book ? (
                <div className="book_container">
                    <div className="book-info">
                        <p className="book_title"><strong>Title:</strong> {book.title}</p>
                        <p className="book_title"><strong>Author:</strong> {book.author}</p>
                        <p className="book_title"><strong>Year:</strong> {book.year}</p>
                        <p className="book_title"><strong>Genre:</strong></p>
                        {genresArray.length === 0 ? (
                            <p className="info_text">This book doesn't have any genre</p>
                        ) : (
                            <ul className="genres-list">
                                {genresArray.map((genre, index) => (
                                    <li key={index}>{genre}</li>
                                ))}
                            </ul>
                        )}
                        <p className="book_title"><strong>Favorite:</strong> {book.isFavorite === 1 ? "Marked as favorite" : "It has not been marked as favorite"}</p>
                        <p className="book_title"><strong>Date of creation:</strong> {bookCreatedTime}</p>
                        <p className="book_title"><strong>Last time it was updated:</strong> {bookUpdatedTime === null ? bookUpdatedTime : "It has not been updated yet"}</p>
                        <p className="book_title"><strong>Book cover:</strong></p>
                        <img
                            src={book.coverImage ? `http://localhost/public/images/${book.coverImage}` : notCoverImageAvailable}
                            alt="cover image"
                            className="book-cover"
                        />
                    </div>
                </div>
            ) : (
                isLoading && <div>Loading...</div>
            )}
        </div>
    )

}
export default BookInfo