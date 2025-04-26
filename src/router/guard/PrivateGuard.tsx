import {Outlet, Navigate} from "react-router-dom";
import Cookies from 'js-cookie';

export const PrivateGuard = () => {
    const userName = Cookies.get("username");
    return userName ? <Outlet /> : <Navigate to="/login" replace/>
}