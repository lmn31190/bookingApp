import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./login.css";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });

  const { loading, error, dispatch } = useContext(AuthContext);

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BACKURL}/auth/login`,
        credentials
      );
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };

  return (
    <div className="login">
      <div className="lContainer">
      {error && (
          <span
            style={{
              backgroundColor: "rgb(255, 72, 72)",
              padding: "5px 50px",
              borderRadius: "10px",
              color: "white",
            }}
          >
            {error.message}
          </span>
        )}
        <input
          type="text"
          placeholder="username"
          id="username"
          onChange={handleChange}
          className="lInput"
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          onChange={handleChange}
          className="lInput"
        />
        <button disabled={loading} onClick={handleClick} className="lButton">
          Se connecter
        </button>
        <span>Vous n'avez pas de compte ? <Link to='/register'>Inscrivez-vous !</Link></span>
      </div>
    </div>
  );
};

export default Login;
