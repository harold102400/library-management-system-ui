import { Route, Navigate } from 'react-router-dom';
import { PrivateGuard } from '../guard/PrivateGuard';
import { PrivateRoutes } from '../private/PrivateRoutes';
import { RoutesWithNotFound } from '../notfound/RoutesWithNotFound';
import { Login } from '../../pages/login/Login';
import { Register } from '../../pages/register/Register';



export const PublicRoutes = () => {

    const username = localStorage.getItem("username");

    return (
            <RoutesWithNotFound>

                <Route path="/" element={username ? <Navigate to="/books" replace /> : <Navigate to="/login" />} />
                <Route path="/login" element={username ? <Navigate to="/books" replace /> : <Login />} />
                <Route path="/register" element={<Register />} />

                <Route element={<PrivateGuard />}>
                    <Route path='/*' element={<PrivateRoutes />} />
                </Route>

            </RoutesWithNotFound>

    )
}