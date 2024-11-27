import {Outlet, Navigate} from "react-router-dom";

export const PrivateGuard = () => {
    const username = localStorage.getItem("username");
    console.log(username)

    return username ? <Outlet /> : <Navigate to="/login" replace/>
}