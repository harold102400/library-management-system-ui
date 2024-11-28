// RecipeForm.tsx

import { useForm } from "react-hook-form";
import { FieldSet } from "../../components/FormFields/FieldSet";
import { FormField } from "../../components/FormFields/FormField";
import { createBook } from "../../services/apiFunctions";
import { BookPropType } from "../../types/books/book.type";
import { useAuth } from "../../context/UserContext";
import { handlError } from "../../components/ErrorAlert/ErrorAlert";
import { useNavigate } from "react-router-dom";

export const Create = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookPropType>();
  const { authState: user_id } = useAuth();
  const navigate = useNavigate();
  const id = user_id.user_id;

  const submitForm = async (data: BookPropType) => {
    try {
      const newData = {
        ...data,
        user_id: String(id),
      };
      console.log(newData);
      navigate("/books");
      await createBook(newData);
    } catch (error: any) {
      handlError(error?.response?.data?.message);
    }
  };

  return (
    <div>
      <h1>Create form</h1>
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
                  message: "Title must contain only letters and spaces",
                },
                maxLength: {
                  value: 200,
                  message: "Title cannot be longer than 200 characters",
                },
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
                  message: "Title must contain only letters and spaces",
                },
                maxLength: {
                  value: 100,
                  message: "Title cannot be longer than 100 characters",
                },
              })}
            />
          </FormField>

          <FormField label="Year" error={errors.year?.message}>
            <input
              type="date"
              placeholder="Year"
              {...register("year", {
                required: "This field is required and cannot be empty",
              })}
            />
          </FormField>

          <div className="categories">
            <p>Categories</p>
            {["Fantasy", "Adventure", "Science Fiction", "Mystery"].map(
              (genre) => (
                <FormField label={genre} key={genre}>
                  <input type="checkbox" value={genre} {...register("genre")} />
                </FormField>
              )
            )}
          </div>

          <FormField label="Favorite" error={errors.isFavorite?.message}>
            <input
              type="checkbox"
              {...register("isFavorite", {
                setValueAs: (value) => (value ? 1 : 0),
              })}
            />
          </FormField>
        </FieldSet>

        <FormField>
          <button>Create new book</button>
        </FormField>
        <FormField>
          <button type="submit">Cancel</button>
        </FormField>
      </form>
    </div>
  );
};
