import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LogInContext } from "../Context/LogInContext";
import axios from "axios";
import { LuEye } from "react-icons/lu";
import { LuEyeOff } from "react-icons/lu";
import "./Styling/delete-user.css";

const DeleteUser = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL_USERS;
  const { user, setUser } = useContext(LogInContext);
  const navigate = useNavigate();
  const [userLogin, setUserLogin] = useState({
    username: "",
    password: "",
  });
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [error, setError] = useState("");
  const [confirmWindow, setConfirmWindow] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserLogin({ ...userLogin, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, password } = userLogin;
    if (!username || !password) {
      setError("Please fill in all fields");
      setTimeout(() => setError(""), 3000);
      return;
    }
    axios
      .post(`${BASE_URL}/login`, userLogin)
      .then((res) => setConfirmWindow(true))
      .catch((err) => {
        setConfirmWindow(false);
        setError(err.response.data.error);
        setTimeout(() => setError(""), 3000);
      });
  };

  const handleConfirm = (e) => {
    e.preventDefault();
    axios
      .delete(`${BASE_URL}/delete/${user.id}`)
      .then(() => {
        setUser(false);
        navigate("/");
      })
      .catch((err) => setError(err.response.data.error));
  };

  return (
    <form onSubmit={handleSubmit} className="delete-user-form">
      <h1>Delete Account</h1>
      {!confirmWindow ? (
        <div
          className="delete-user-form__inputs"
          style={{
            borderBottomLeftRadius: "1.3rem",
            borderBottomRightRadius: "1.3rem",
          }}
        >
          <div className="form-inp">
            <input
              type="text"
              id="username"
              name="username"
              placeholder="username"
              value={userLogin.username}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-inp">
            <input
              type={passwordVisibility ? "text" : "password"}
              id="password"
              name="password"
              placeholder="password"
              value={userLogin.password}
              onChange={handleInputChange}
            />
            {passwordVisibility ? (
              <LuEyeOff
                className="eye-icon"
                onClick={() => setPasswordVisibility(!passwordVisibility)}
              />
            ) : (
              <LuEye
                className="eye-icon"
                onClick={() => setPasswordVisibility(!passwordVisibility)}
              />
            )}
          </div>
          <div className="delete-user-form__main-btns">
            <button onClick={() => navigate(-1)}>Back</button>
            <button type="submit">Delete Account</button>
          </div>
          <div className="errors">
            {error ? <p style={{ color: "red" }}>{error}</p> : ""}
          </div>
        </div>
      ) : (
        <div className="delete-user-form__confirm-delete">
          <p>Are you sure you want to delete your account?</p>
          <div className="confirm-btns">
            <button onClick={handleConfirm}>Yes</button>
            <button onClick={() => setConfirmWindow(false)}>No</button>
          </div>
        </div>
      )}
    </form>
  );
};

export default DeleteUser;
