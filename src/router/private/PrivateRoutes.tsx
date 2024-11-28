import { RootLayout } from "../../components/Layout/RootLayout";
import BookInfo from "../../pages/bookinfo/BookInfo";
import BookTable from "../../pages/books/BookTable";
import { Create } from "../../pages/create/Create";
import { Edit } from "../../pages/edit/Edit";
import { RoutesWithNotFound } from "../notfound/RoutesWithNotFound"
import {Route, Navigate} from "react-router-dom";

export const PrivateRoutes = () => {
    return (
        <RoutesWithNotFound>
            <Route element={<RootLayout />}>
            <Route path="/" element={<Navigate to="/books"/>}/>
            <Route path="/books" element={<BookTable />}/>
            <Route path="/create" element={<Create />}/>
            <Route path="/detail/:id" element={<BookInfo />}/>
            <Route path="/edit/:id" element={<Edit />}/>
            </Route>
        </RoutesWithNotFound>
    )
}