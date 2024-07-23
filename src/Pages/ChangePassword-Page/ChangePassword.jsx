import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {LogInContext} from "../Context/LogInContext";
import axios from "axios";
import { LuEye } from "react-icons/lu";
import { LuEyeOff } from "react-icons/lu";
import { validatePassword } from "../Helper-Functions/validatePassword.js";

const ChangePassword = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL_USERS;
  const { user } = useContext(LogInContext);
  const navigate = useNavigate();
  const [userLogin, setUserLogin] = useState({
    username: "",
    password: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [error, setError] = useState("");
  const [validationResults, setValidationResults] = useState({
    length: false,
    lowercase: false,
    uppercase: false,
    number: false,
    specialChar: false,
    noRepeat: true,
  });
  const [passwordPassed, setPasswordPassed] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserLogin({ ...userLogin, [name]: value });
    if (name === "newPassword") {
      validatePassword(value, setValidationResults);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, password, newPassword, confirmPassword } = userLogin;
    if (!username || !password || !newPassword || !confirmPassword) {
      setError("Please fill in all fields");
      setTimeout(() => setError(""), 3000);
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      setTimeout(() => setError(""), 3000);
      return;
    }
    axios.put(`${BASE_URL}/change-password`, {...userLogin, id: user.id}).then((res) => {
      if (res.data.error) {
        setError(res.data.error);
        setTimeout(() => setError(""), 3000);
        return;
      } else {
        navigate("/profile");
      }
    });
  };

  useEffect(() => {
    setPasswordPassed(
      Object.values(validationResults).every((result) => result === true)
    );
  }, [validationResults]);

  return (
    <form onSubmit={handleSubmit} className="change-password-form">
      <div className="change-password-form__section">
        <label htmlFor="username">Username:</label>
        <div className="form-input">
          <input
            type="text"
            id="username"
            name="username"
            value={userLogin.username}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="change-password-form__section">
        <label htmlFor="password">Current Password:</label>
        <div className="form-input">
          <input
            type={passwordVisibility ? "text" : "password"}
            id="password"
            name="password"
            value={userLogin.password}
            onChange={handleInputChange}
          />
          {passwordVisibility ? (
            <LuEyeOff onClick={() => setPasswordVisibility(false)} />
          ) : (
            <LuEye onClick={() => setPasswordVisibility(true)} />
          )}
        </div>
      </div>
      <div className="change-password-form__section">
        <label htmlFor="newPassword">New Password:</label>
        <div className="form-input">
          <input
            type={passwordVisibility ? "text" : "password"}
            id="newPassword"
            name="newPassword"
            value={userLogin.newPassword}
            onChange={handleInputChange}
          />
          {passwordVisibility ? (
            <LuEyeOff onClick={() => setPasswordVisibility(false)} />
          ) : (
            <LuEye onClick={() => setPasswordVisibility(true)} />
          )}
        </div>
      </div>
      {!passwordPassed && !userLogin.newPassword ? (
        ""
      ) : !passwordPassed ? (
        <ul className="signup-form__section validations">
          <li style={{ color: validationResults.length ? "green" : "red" }}>
            At least 12 characters
          </li>
          <li style={{ color: validationResults.lowercase ? "green" : "red" }}>
            At least one lowercase letter
          </li>
          <li style={{ color: validationResults.uppercase ? "green" : "red" }}>
            At least one uppercase letter
          </li>
          <li style={{ color: validationResults.number ? "green" : "red" }}>
            At least one number
          </li>
          <li
            style={{ color: validationResults.specialChar ? "green" : "red" }}
          >
            At least one special character
          </li>
          <li
            style={{
              color:
                validationResults.noRepeat && userLogin.newPassword
                  ? "green"
                  : "red",
            }}
          >
            No repeating characters in a row
          </li>
        </ul>
      ) : (
        <div className="signup-form__section">
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <div className="form-input">
            <input
              type={passwordVisibility ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              value={userLogin.confirmPassword}
              onChange={handleInputChange}
            />
            {passwordVisibility ? (
              <LuEyeOff
                onClick={() => setPasswordVisibility((prev) => !prev)}
              />
            ) : (
              <LuEye onClick={() => setPasswordVisibility((prev) => !prev)} />
            )}
          </div>
        </div>
      )}
      <div className="change-password-form__section main-btns">
        <button type="button" onClick={() => navigate("/")}>
          Cancel
        </button>
        <button type="submit">Change Password</button>
      </div>
    </form>
  );
};

export default ChangePassword;
