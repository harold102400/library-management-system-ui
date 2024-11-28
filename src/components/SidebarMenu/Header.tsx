import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/UserContext";
import "./Header.css";
const Header = () => {
  const navigate = useNavigate();
  const { onLogout, authState: auth } = useAuth();

  const handleSignout = () => {
    onLogout();
    localStorage.clear();
    navigate("/login");
    window.location.reload();
  };
  return (
    <header className="header">
      <div className="header-welcome-ms">
        <span className="header-welcome-ms-content">
          <b>Welcome Back</b> &nbsp; {auth.username}
        </span>
        <span className="logout-btn" onClick={handleSignout}>
          Logout
        </span>
      </div>
    </header>
  );
};

export default Header;
