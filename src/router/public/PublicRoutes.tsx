import { Route, Navigate } from 'react-router-dom';
import { PrivateGuard } from '../guard/PrivateGuard';
import { PrivateRoutes } from '../private/PrivateRoutes';
import { RoutesWithNotFound } from '../notfound/RoutesWithNotFound';
import  Login  from '../../pages/login/Login';
import  Register  from '../../pages/register/Register';
import Cookies from 'js-cookie';


export const PublicRoutes = () => {
    const userName = Cookies.get("username");

    return (
            <RoutesWithNotFound>

                <Route path="/" element={userName ? <Navigate to="/books" replace /> : <Navigate to="/login" />} />
                <Route path="/login" element={userName ? <Navigate to="/books" replace /> : <Login />} />
                <Route path="/register" element={<Register />} />

                <Route element={<PrivateGuard />}>
                    <Route path='/*' element={<PrivateRoutes />} />
                </Route>

            </RoutesWithNotFound>

    )
}