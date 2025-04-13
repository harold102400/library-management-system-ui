import axios from "axios";
import React, { useState } from "react";
import { useLibrary } from "../../context/LibraryContext";
import { BookPropType } from "../../types/books/book.type";
import { handlError } from "../ErrorAlert/ErrorAlert";
import { successAlert } from "../SuccessAlert/SuccessAlert";
import "./ImageUploader.css";

type ImageUploaderProps = {
  book: BookPropType;
  onHide: () => void;
};

const ImageUploader = ({ book, onHide }: ImageUploaderProps) => {
  const { setBooks, getOneBook } = useLibrary();
  const [file, setFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null); // Estado para la previsualización

  // Función para manejar la selección de un nuevo archivo
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const selectedFile = event.target.files[0];
      setFile(selectedFile);

      // Crear un URL de objeto para la imagen seleccionada para la previsualización
      const objectUrl = URL.createObjectURL(selectedFile);
      setPreviewImage(objectUrl);
    }
  };

  const handleImage = (book: BookPropType) => {
    setBooks((prevBooks) => {
      // Verificamos si prevBooks es null
      if (prevBooks === null) {
        return null; // Si no hay libros, simplemente devolvemos null.
      }
      const updatedBooks = prevBooks.data.map((prevBook) => {
        return prevBook.id === book.id
          ? { ...prevBook, coverImage: book.coverImage }
          : prevBook;
      });

      // Devolvemos el nuevo objeto ApiResponseProp con el array actualizado
      return { ...prevBooks, data: updatedBooks };
    });
  };

  const handleClick = () => {
    if (!file) {
      return;
    }
    onHide();
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Si no se ha seleccionado imagen no se puede enviar el form
    if (!file) return handlError("You did not select any image...try again!");

    try {
      const imageFormData = new FormData();
      imageFormData.append("coverImage", file);
      imageFormData.append("bookId", book.id);

      // Subir la imagen al endpoint /api/uploadcover
      await axios.post(
        `http://localhost/api/books/uploadcover`,
        imageFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      //se obtiene del contexto el libro con la imagen actualizada
      const updatedBookResponse = await getOneBook(Number(book.id));

      //se agrega al estado para react renderice la pagina con la nueva imagen
      handleImage({ ...book, coverImage: updatedBookResponse.coverImage });

      successAlert("The new image has been saved successfully!");
    } catch (error: any) {
      handlError(error.response.data.message);
    }
  };

  if (!book) return <div>Loading...</div>;

  return (
    <form onSubmit={handleSubmit}>
      <div>
        {/* Mostrar la previsualización de la nueva imagen seleccionada */}
        {previewImage ? (
          <div className="coverimage-container">
            <div>
              <label htmlFor="coverImage" className="coverimage-title">
                Selected image:
              </label>
            </div>
            <img
              src={previewImage}
              alt="Imagen de portada seleccionada"
              style={{ maxWidth: "375px" }}
            />
          </div>
        ) : book.coverImage ? (
          // Si no hay una imagen seleccionada, mostrar la imagen actual
          <div className="coverimage-container">
            <div>
              <label htmlFor="coverImage" className="coverimage-title">
                Current image:
              </label>
            </div>
            <img
              src={`http://localhost/public/images/${book.coverImage}`}
              alt="Imagen de portada actual"
              style={{ maxWidth: "375px" }}
            />
          </div>
        ) : (
          // Si no hay una imagen para ese id, mostrar imagen no disponible
          <div className="coverimage-container">
            <div>
              <label htmlFor="coverImage" className="coverimage-title">
                There is no image selected:
              </label>
            </div>
            <img
              src="/src/assets/Image_not_available.png"
              alt="Imagen de portada actual"
              style={{ maxWidth: "375px" }}
            />
          </div>
        )}
        <label className="drop-container" id="dropcontainer">
          <span className="drop-title">Drop files here</span>
          or
          <input
            type="file"
            id="coverImage"
            onChange={handleFileChange}
            accept="image/*"
            className="coverimage-input"
          />
        </label>
      </div>

      <button
        type="submit"
        className="coverimage-submit-button"
        onClick={handleClick}
      >
        Save changes
      </button>
    </form>
  );
};

export default ImageUploader;
