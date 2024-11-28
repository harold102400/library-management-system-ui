import BookInfo from "../../pages/bookinfo/BookInfo";
import BookTable from "../../pages/books/BookTable";
import { RoutesWithNotFound } from "../notfound/RoutesWithNotFound"
import {Route, Navigate} from "react-router-dom";

export const PrivateRoutes = () => {
    return (
        <RoutesWithNotFound>
            <Route path="/" element={<Navigate to="/books"/>}/>
            <Route path="/books" element={<BookTable />}/>
            <Route path="/detail/:id" element={<BookInfo />}/>
        </RoutesWithNotFound>
    )
}