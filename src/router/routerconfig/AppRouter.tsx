import { BrowserRouter } from 'react-router-dom';
import { ReactNode } from 'react';
import { PublicRoutes } from '../public/PublicRoutes';

type Props = {
    children: ReactNode
}
export const AppRouter = ({ children }: Props) => {
    return (
        <BrowserRouter>
            {children}
          <PublicRoutes />
        </BrowserRouter>
    )
}