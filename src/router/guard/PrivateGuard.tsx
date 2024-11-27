import {Outlet, Navigate} from "react-router-dom";

export const PrivateGuard = () => {
    const username = localStorage.getItem("userDisplayName");

    return username ? <Outlet /> : <Navigate to="/login" replace/>
}