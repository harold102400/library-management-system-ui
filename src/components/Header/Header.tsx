import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/UserContext";
import Cookies from 'js-cookie';

import "./Header.css";
const Header = () => {
  const navigate = useNavigate();
  const { onLogout } = useAuth();
  const userName = Cookies.get("username");


  const handleSignout = () => {
    onLogout();
    // localStorage.clear();
    navigate("/login");
    // window.location.reload();
  };
  return (
    <header className="header">
      <div className="header-welcome-ms">
        <span className="header-welcome-ms-content">
          <b>Welcome Back</b> &nbsp; {userName}
        </span>
        <span className="logout-btn" onClick={handleSignout}>
          Logout
        </span>
      </div>
    </header>
  );
};

export default Header;
