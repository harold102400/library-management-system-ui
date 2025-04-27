import axios from "axios";
import { API_URL } from "../../config/config";
import { ApiResponseProp, BookPropType } from "../../types/books/book.type";
import { handlError } from "../ErrorAlert/ErrorAlert";

type exportPDFProp = {
  books: ApiResponseProp<BookPropType[]> | null;
};

const ExportPDF = ({ books }: exportPDFProp) => {
  const downloadPDF = async () => {
    if (!books?.data) {
      handlError("An error has occurred, please try again later!");
    }

    const response = await axios.post(
      `${API_URL}/books/generatepdf`,
      books?.data,
      { responseType: "blob" }
    );

    const file = new Blob([response.data], { type: "application/pdf" });
    const fileURL = URL.createObjectURL(file);

    window.open(fileURL);

    setTimeout(() => URL.revokeObjectURL(fileURL), 100000);
  };
  return (
    <button className="btn-export" onClick={downloadPDF}>
      Export PDF
    </button>
  );
};

export default ExportPDF;
