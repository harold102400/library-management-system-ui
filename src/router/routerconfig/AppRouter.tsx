import { BrowserRouter, Route, Navigate } from 'react-router-dom';
import { PrivateGuard } from '../guard/PrivateGuard';
import { PrivateRoutes } from '../private/PrivateRoutes';
import { ReactNode } from 'react';
import { RoutesWithNotFound } from '../notfound/RoutesWithNotFound';
import { Login } from '../../pages/login/Login';
import { Register } from '../../pages/register/Register';
import { PublicRoutes } from '../public/PublicRoutes';

type Props = {
    children: ReactNode
}

export const AppRouter = ({ children }: Props) => {

    const username = localStorage.getItem("username");

    return (
        <BrowserRouter>
            {children}
          <PublicRoutes />
        </BrowserRouter>
    )
}