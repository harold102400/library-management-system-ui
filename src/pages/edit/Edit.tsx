import { useForm } from "react-hook-form";
import { FieldSet } from "../../components/FormFields/FieldSet";
import { FormField } from "../../components/FormFields/FormField";
import { BookPropType } from "../../types/books/book.type";
import { useAuth } from "../../context/UserContext";
import { handlError } from "../../components/ErrorAlert/ErrorAlert";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useLibrary } from "../../context/LibraryContext";
import { useEffect } from "react";
import "../../components/FormFields/FormStyles.css";


export const Edit = () => {
  const { edit, book, getOneBook } = useLibrary();
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<BookPropType>({
    defaultValues: {
      title: '',
      author: '',
      year: '',
      isFavorite: 0,
      genre: '[]'
    }
  });
  const {id} = useParams()
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
      navigate('/books');
    } catch (error: any) {
      handlError(error?.response?.data?.message);
    }
  };
  const genreValues = watch("genre");

  return (
    <div className="form-container">
      <h1 className="form-header">Edit form</h1>
      <form onSubmit={handleSubmit(submitForm)} className="form">
        <FieldSet>
          <FormField label="Title" error={errors.title?.message}>
            <input
              type="text"
              placeholder="Title"
              className="form-input"
              {...register("title", {
                required: "This field is required and cannot be empty",
                setValueAs: (value) => value.trim(),
                pattern: {
                  value: /^[A-Za-zÀ-ÿ0-9\s.@]+$/,
                  message: "Title must contain only letters and spaces"
                },
                maxLength: {
                  value: 200,
                  message: "Title cannot be longer than 200 characters"
                }
              })}
            />
            
          </FormField>

          <FormField label="Author" error={errors.author?.message}>
            <input
              type="text"
              placeholder="Author"
              className="form-input"
              {...register("author", {
                required: "This field is required and cannot be empty",
                setValueAs: (value) => value.trim(),
                pattern: {
                  value: /^[A-Za-zÀ-ÿ0-9\s.@]+$/,
                  message: "Author must contain only letters and spaces"
                },
                maxLength: {
                  value: 100,
                  message: "Author cannot be longer than 100 characters"
                }
              })}
            />
          </FormField>

          <FormField label="Year" error={errors.year?.message}>
            <input
              type="date"
              placeholder="Year"
              className="form-input"
              {...register("year", {
                required: "This field is required and cannot be empty"
              })}
            />
          </FormField>

          <div className="categories">
            <p className="categories-header">Categories</p>
            {["Fantasy", "Adventure", "Science Fiction", "Mystery"].map((genre) => (
              <div className="checkbox-container" key={genre}>
                <input
                  type="checkbox"
                  className="checkbox-input"
                  value={genre}
                  {...register("genre")}
                  checked={genreValues?.includes(genre)}
                />
                <label className="checkbox-label">{genre}</label>
              </div>
            ))}
          </div>

          <FormField label="Favorite" error={errors.isFavorite?.message}>
            <input
              type="checkbox"
              className="checkbox-input"
              {...register("isFavorite")}
            />
          </FormField>
        </FieldSet>

        <FormField>
          <button type="submit" className="form-button">Edit this book</button>
        </FormField>
        <FormField>
          <Link to="/books" className="cancel-button">Cancel</Link>
        </FormField>
      </form>
    </div>
  );
};
