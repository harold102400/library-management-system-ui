import { useForm } from "react-hook-form";
import { BookPropType } from "../../types/books/book.type";
import { useAuth } from "../../context/UserContext";
import { handlError } from "../../components/ErrorAlert/ErrorAlert";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useLibrary } from "../../context/LibraryContext";
import { useEffect } from "react";
import { handleApiError } from "../../utils/handleApiErrors";
import { mainGenres } from "../../config/genres.config";
import "../../components/FormFields/FormStyles.css";

export const Edit = () => {
  const { edit, book, getOneBook } = useLibrary();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<BookPropType>({
    defaultValues: {
      title: "",
      author: "",
      year: "",
      isFavorite: 0,
      genre: "[]",
    },
  });
  const { id } = useParams();
  const parsedBookId = Number(id);

  useEffect(() => {
    getOneBook(parsedBookId);
  }, [parsedBookId]);

  useEffect(() => {
    if (book) {
      setValue("title", book.title);
      setValue("author", book.author);
      setValue("year", book.year);
      setValue("isFavorite", book.isFavorite);
      setValue("genre", book.genre);
    }
  }, [book, setValue]);

  const { authState: user_id } = useAuth();
  const navigate = useNavigate();
  const userId = user_id.user_id;

  const submitForm = async (data: BookPropType) => {
    try {
      const newData = {
        ...data,
        genre: JSON.stringify(data.genre),
        user_id: String(userId),
      };

      await edit(newData, parsedBookId);
      navigate("/books");
    } catch (error: unknown) {
      const errorMessage = handleApiError(error);
      handlError(errorMessage);
    }
  };
  const genreValues = watch("genre");

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header-form-title">
          <span>Edit book</span>
          <Link to={"/books"} className="link-btn">
            <button className="close-button">×</button>
          </Link>
        </div>
        <div className="modal-body">
          <form onSubmit={handleSubmit(submitForm)}>
            <div className="form-group">
              <label className="form-label">Title:</label>
              <input
                type="text"
                className="form-input"
                {...register("title", {
                  required: "This field is required and cannot be empty",
                  setValueAs: (value) => value.trim(),
                  pattern: {
                    value: /^[A-Za-zÀ-ÿ0-9\s.@]+$/,
                    message: "Title must contain only letters and spaces",
                  },
                  maxLength: {
                    value: 200,
                    message: "Title cannot be longer than 200 characters",
                  },
                })}
              />
              {errors.title && (
                <span className="error-message">{errors.title.message}</span>
              )}
            </div>

            <div className="form-group">
              <label className="form-label">Author:</label>
              <input
                type="text"
                className="form-input"
                {...register("author", {
                  required: "This field is required and cannot be empty",
                  setValueAs: (value) => value.trim(),
                  pattern: {
                    value: /^[A-Za-zÀ-ÿ0-9\s.@]+$/,
                    message: "Title must contain only letters and spaces",
                  },
                  maxLength: {
                    value: 100,
                    message: "Title cannot be longer than 100 characters",
                  },
                })}
              />
              {errors.author && (
                <span className="error-message">{errors.author.message}</span>
              )}
            </div>

            <div className="form-group">
              <label className="form-label">Year:</label>
              <input
                type="date"
                className="form-input"
                {...register("year", {
                  required: "This field is required and cannot be empty",
                })}
              />
              {errors.year && (
                <span className="error-message">{errors.year.message}</span>
              )}
            </div>

            <div className="form-group">
              <label className="form-label">Genres:</label>
              <div className="checkbox-grid">
                {mainGenres.map(
                  (genre, index) => {
                    const checkboxId = `cbx-genre-${index}`;
                    return (
                      <div className="checkbox-wrapper-15" key={genre}>
                        <input
                          className="inp-cbx"
                          id={checkboxId}
                          type="checkbox"
                          style={{ display: "none" }}
                          value={genre}
                          {...register("genre")}
                          checked={genreValues?.includes(genre)}
                        />
                        <label className="cbx" htmlFor={checkboxId}>
                          <span>
                            <svg width="12px" height="9px" viewBox="0 0 12 9">
                              <polyline points="1 5 4 8 11 1"></polyline>
                            </svg>
                          </span>
                          <span>{genre}</span>
                        </label>
                      </div>
                    );
                  }
                )}
              </div>
            </div>

            <div className="actions-container">
              <Link to="/books" className="cancel-button">
                Cancel
              </Link>
              <button type="submit" className="submit-btn">
                Edit book
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
