import './RootLayout.css';
import { Outlet } from 'react-router-dom';
import { useAuth } from '../../context/UserContext';
import Header from '../Header/Header';

export const RootLayout = () => {
  const { authState: userDisplayName } = useAuth();

  return (
    <div className="root-layout">
      <header>{userDisplayName && <Header />}</header>
      <main className='main-layout'>
        <Outlet />
      </main>
    </div>
  );
};