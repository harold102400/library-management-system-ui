import { API_URL } from "../../config/config";
import { ApiResponseProp, BookPropType } from "../../types/books/book.type";
import { handlError } from "../ErrorAlert/ErrorAlert";
import { handleApiError } from "../../utils/handleApiErrors";
import api from "../../api/api";

type exportPDFProp = {
  books: ApiResponseProp<BookPropType[]> | null;
};

const ExportPDF = ({ books }: exportPDFProp) => {
  const downloadPDF = async () => {
    if (!books?.data) {
      handlError("An error has occurred, please try again later!");
    }

    try {
      const response = await api.post(
        `${API_URL}/books/generatepdf`,
        books?.data,
        { responseType: "blob" }
      );
      const file = new Blob([response.data], { type: "application/pdf" });
      const fileURL = URL.createObjectURL(file);
      window.open(fileURL);
      setTimeout(() => URL.revokeObjectURL(fileURL), 100000);
    } catch (error) {
      const errorMessage = handleApiError(error);
      handlError(errorMessage);
    }
    
  };
  return (
    <button className="btn-export" onClick={downloadPDF}>
      Export PDF
    </button>
  );
};

export default ExportPDF;
