import { Link, useNavigate } from "react-router-dom";
import "./navbar.css";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleClick = () => {
    localStorage.removeItem("user");
    navigate(0);
  };
  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo" style={{ fontWeight: "bold" }}>
            louisbooking
          </span>
        </Link>
        {user ? (
          <div className="profile">
            <a href="http://adminlouisbooking.netlify.app">
              <img
                className="avatar"
                src={
                  user.img
                    ? user.img
                    : "https://image.noelshack.com/fichiers/2023/18/3/1683118191-defaultprofile.png"
                }
                alt=""
              />
            </a>
            <button onClick={handleClick}>Se déconnecter</button>
          </div>
        ) : (
          <div className="navItems">
            <Link to="/register">
              <button className="navButton">S'inscire</button>
            </Link>
            <Link to="/login">
              <button className="navButton">Se connecter</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
