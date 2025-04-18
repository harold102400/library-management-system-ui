import { useForm } from "react-hook-form";
import { FieldSet } from "../../components/FormFields/FieldSet";
import { FormField } from "../../components/FormFields/FormField";
import { createBook } from "../../services/apiFunctions";
import { BookPropType } from "../../types/books/book.type";
import { useAuth } from "../../context/UserContext";
import { handlError } from "../../components/ErrorAlert/ErrorAlert";
import { useNavigate, Link } from "react-router-dom";
import "../../components/FormFields/FormStyles.css";
import { handleApiError } from "../../utils/handleApiErrors";

export const Create = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookPropType>({
    defaultValues: {
      title: "",
      author: "",
      year: "",
      isFavorite: 0,
      genre: '[]',
    },
  });
  const { authState: user_id } = useAuth();
  const navigate = useNavigate();
  const id = user_id.user_id;
  

  const submitForm = async (data: BookPropType) => {
    try {
      const newData = {
        ...data,
        genre: JSON.stringify(data.genre),
        user_id: String(id),
      };
      await createBook(newData);
      navigate("/books");
    } catch (error: unknown) {
      const errorMessage = handleApiError(error)
      handlError(errorMessage)
    }
  };
  
  
  return (
    <div className="form-container">
      <h1 className="form-header">Create form</h1>
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
          </FormField>

          <FormField label="Year" error={errors.year?.message}>
            <input
              type="date"
              placeholder="Year"
              className="form-input"
              {...register("year", {
                required: "This field is required and cannot be empty",
              })}
            />
          </FormField>

          <div className="categories">
            <p className="categories-header">Categories</p>
            {["Fantasy", "Adventure", "Science Fiction", "Mystery"].map(
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

          {/* <FormField label="Picture" error={errors.coverImage?.message}>
            <input
              {...register("coverImage", {
                required: "The cover picture is required",
              })}
              type="file"
              id="coverImage"
              accept=".jpg,.jpeg"
              className="form-input"
            />
          </FormField> */}

          {/* <FormField label="Is this your Favorite Book?" error={errors.isFavorite?.message}>
            <input
              type="checkbox"
              className="checkbox-input"
              {...register("isFavorite", {
                setValueAs: (value) => (value ? 1 : 0),
              })}
            />
          </FormField> */}
        </FieldSet>

        <FormField>
          <button className="form-button">Create new book</button>
        </FormField>
        <FormField>
          <Link to="/books" className="cancel-button">
            Cancel
          </Link>
        </FormField>
      </form>
    </div>
  );
};
