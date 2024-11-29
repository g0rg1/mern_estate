import "./navbar.css";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import { useEffect, useState } from "react";

function Navbar() {
  const [isUser, setIsUser] = useState(false);
  const [username, setUsername] = useState(null);
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    // Проверка на наличие токена
    const token = Cookies.get("access_token");
    if (token) {
      axios
        .post("http://localhost:5500/auth/", {}, { withCredentials: true })
        .then((response) => {
          if (response.data.status) {
            setIsUser(true);
            setUsername(response.data.user);
            setAdmin(response.data.isAdmin);
          }
        })
        .catch((err) => {
          console.error("Error verifying user:", err);
        });
    }
  }, []);
  const handleLogout = () => {
    Cookies.remove("access_token");
    setIsUser(false);
    setUsername(null);
  };
  return (
    <div className="navbar">
      <Link className="nav-link" to="/">
        <div className="logo">
          <p className="rental">Rental.</p>
        </div>
      </Link>

      <div className="buttons">
        {isUser ? (
          <>
            <p>
              Welcome <span className="username">{username}</span>
            </p>
            {admin ? (
              <Link className="nav-link" to="/admin">
                <button className="host">Admin</button>
              </Link>
            ) : null}
            <Link className="nav-link" to="/create">
              <button className="host">Become a host</button>
            </Link>
            <Link className="nav-link" to="/reservation">
              <button className="host">My reservations</button>
            </Link>
            <button onClick={handleLogout} className="register">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link className="nav-link" to="/login">
              <button className="login">Login</button>
            </Link>
            <Link className="nav-link" to="/register">
              <button className="register">Register</button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
