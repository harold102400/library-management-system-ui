import { ApiResponseProp, BookPropType } from "../../types/books/book.type";
import { handlError } from "../ErrorAlert/ErrorAlert";

type exportCVSProp = {
  books: ApiResponseProp<BookPropType[]> | null;
  fileName?: string;
};

const removeAccents = (str: string) =>
  str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

const ExportCVS = ({ books, fileName = "Report" }: exportCVSProp) => {
  const downloadCSV = () => {
    // Convert the data array into a CSV string
    if (books) {
      const csvString = [
        [
          "ID",
          "Title",
          "Author",
          "Year",
          "Genres",
          "Date of creation",
        ], // Specify your headers here
        ...books.data.map((book) => {
            const title = removeAccents(book.title);
            const author = removeAccents(book.author);
            const genres = `"${JSON.parse(book.genre).join(", ")}"`;
      
            return [
              book.id,
              title,
              author,
              book.year,
              genres,
              book.createdAt.toString().slice(0, 10)
            ];
          }),
        ]
        .map((row) => row.join(","))
        .join("\n");
      // Create a Blob from the CSV string
      const blob = new Blob([csvString], { type: "text/csv" });

      // Generate a download link and initiate the download
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = fileName || "download.csv";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } else {
      handlError("An error has occurred, please try again later");
    }
  };

  return (
    <button className="btn-export" onClick={downloadCSV}>
      Export CSV
    </button>
  );
};

export default ExportCVS;
