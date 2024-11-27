import { RoutesWithNotFound } from "../notfound/RoutesWithNotFound"
import {Route, Navigate} from "react-router-dom";

export const PrivateRoutes = () => {
    return (
        <RoutesWithNotFound>
            <Route path="/" element={<Navigate to="/books"/>}/>
            <Route path="/books" element={<h1>Página de libros</h1>}/>
        </RoutesWithNotFound>
    )
}