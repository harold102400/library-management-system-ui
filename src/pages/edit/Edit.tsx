import { useForm } from "react-hook-form";
import { FieldSet } from "../../components/FormFields/FieldSet";
import { FormField } from "../../components/FormFields/FormField";
import { BookPropType } from "../../types/books/book.type";
import { useAuth } from "../../context/UserContext";
import { handlError } from "../../components/ErrorAlert/ErrorAlert";
import { useNavigate, useParams } from "react-router-dom";
import { useLibrary } from "../../context/LibraryContext";
import { useEffect } from "react";

export const Edit = () => {
  const { edit, book, getOneBook } = useLibrary();
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<BookPropType>({
    defaultValues: {
      title: '',
      author: '',
      year: '',
      isFavorite: 0,
      genre: [] 
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
    <div>
      <h1>Edit form</h1>
      <form onSubmit={handleSubmit(submitForm)}>
        <FieldSet>
          <FormField label="Title" error={errors.title?.message}>
            <input
              type="text"
              placeholder="Title"
              {...register("title", {
                required: "This field is required and cannot be empty",
                setValueAs: (value) => value.trim(),
                pattern: {
                  value: /^[A-Za-zÀ-ÿ\s.]+$/,
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
              {...register("author", {
                required: "This field is required and cannot be empty",
                setValueAs: (value) => value.trim(),
                pattern: {
                  value: /^[A-Za-zÀ-ÿ\s.]+$/,
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
              {...register("year", {
                required: "This field is required and cannot be empty"
              })}
            />
          </FormField>

          <div className="categories">
            <p>Categories</p>
            {["Fantasy", "Adventure", "Science Fiction", "Mystery"].map((genre) => (
              <FormField label={genre} key={genre}>
                <input
                  type="checkbox"
                  value={genre}
                  {...register("genre")}
                  checked={genreValues?.includes(genre)}
                />
              </FormField>
            ))}
          </div>

          <FormField label="Favorite" error={errors.isFavorite?.message}>
            <input
              type="checkbox"
              {...register("isFavorite")}
            />
          </FormField>
        </FieldSet>

        <FormField>
          <button type="submit">Edit this book</button>
        </FormField>
        <FormField>
          <button type="submit">Cancel</button>
        </FormField>
      </form>
    </div>
  );
};
