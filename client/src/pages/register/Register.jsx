import "./register.scss";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = ({ inputs, title }) => {
  const [file, setFile] = useState("");
  const [info, setInfo] = useState({});
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "upload");

    try {
      if (file) {
        const uploadRes = await axios.post(
          "https://api.cloudinary.com/v1_1/djcsgqxgg/image/upload",
          data
        );

        const { url } = uploadRes.data;

        const newUser = {
          ...info,
          img: url,
        };

        await axios.post(
          `${process.env.REACT_APP_BACKURL}/auth/register`,
          newUser
        );
      } else {
        const newUser = {
          ...info,
        };
        await axios.post(
          `${process.env.REACT_APP_BACKURL}/auth/register`,
          newUser
        );
      }

      setSuccess(true);
      setError(false);

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      console.log(err);
      setError(true);
      setSuccess(false);
    }
  };

  return (
    <div className="new">
      <div className="newContainer">
        <div className="top">
          <h1>{title}</h1>
        </div>
        <>
          {success && (
            <span style={{
                padding: "5px 50px",
                color: "rgb(0, 185, 9)",
              }}> Votre compte a bien été crée, veuillez patienter...</span>
          )}
          {error && (
            <span
              style={{
                padding: "5px 50px",
                color: "rgb(255, 72, 72)",
              }}
            >
              {" "}
              Erreur, vérifiez le formulaire !
            </span>
          )}
        </>
        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form>
              <div className="formInput">
                <label htmlFor="file">Image:</label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </div>

              {inputs?.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    onChange={handleChange}
                    type={input.type}
                    placeholder={input.placeholder}
                    id={input.id}
                  />
                </div>
              ))}
              <button onClick={handleClick}>Envoyer</button>
              <span>Vous avez déja un compte ? <Link to='/login'>Connectez-vous !</Link></span>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
