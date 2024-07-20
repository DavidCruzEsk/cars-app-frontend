import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { LogInContext } from "../Context/LogInContext";
import { LuEye } from "react-icons/lu";
import { LuEyeOff } from "react-icons/lu";
import "./Styling/signup.css";
import { validatePassword } from "../Helper-Functions/validatePassword.js";

const Signup = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL_USERS;
  const navigate = useNavigate();
  const { setUser } = useContext(LogInContext);
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
    firstName: "",
    lastName: "",
    birthDate: "",
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
    setCredentials({ ...credentials, [name]: value });
    if (name === "password") {
      validatePassword(value, setValidationResults);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const {
      username,
      password,
      confirmPassword,
      email,
      firstName,
      lastName,
      birthDate,
    } = credentials;
    if (
      !username ||
      !password ||
      !confirmPassword ||
      !email ||
      !firstName ||
      !lastName ||
      !birthDate
    ) {
      setError("Please fill in all fields");
      setTimeout(() => setError(""), 3000);
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setTimeout(() => setError(""), 3000);
      return;
    }
    axios
      .post(`${BASE_URL}/register`, {
        username,
        password,
        email,
        firstName,
        lastName,
        birthDate,
      })
      .then((res) => {
        setUser(res.data);
        navigate("/");
      })
      .catch((err) => {
        setError(err.response.data.error);
        setTimeout(() => setError(""), 3000);
      });
  };

  useEffect(() => {
    setPasswordPassed(
      Object.values(validationResults).every((result) => result === true)
    );
  }, [validationResults]);

  return (
    <form onSubmit={handleSubmit} className="signup-form">
      <div className="signup-form__section">
        <h2>Sign Up</h2>
      </div>
      <div className="signup-form__section">
        <label htmlFor="firstName">First Name:</label>
        <div className="form-input">
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={credentials.firstName}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="signup-form__section">
        <label htmlFor="lastName">Last Name:</label>
        <div className="form-input">
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={credentials.lastName}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="signup-form__section">
        <label htmlFor="birthDate">Birth Date:</label>
        <div className="form-input">
          <input
            type="date"
            id="birthDate"
            name="birthDate"
            value={credentials.birthDate}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="signup-form__section">
        <label htmlFor="email">Email:</label>
        <div className="form-input">
          <input
            type="email"
            id="email"
            name="email"
            value={credentials.email}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="signup-form__section">
        <label htmlFor="username">Username:</label>
        <div className="form-input">
          <input
            type="text"
            id="username"
            name="username"
            value={credentials.username}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="signup-form__section">
        <label htmlFor="password">Password:</label>
        <div className="form-input">
          <input
            type={passwordVisibility ? "text" : "password"}
            id="password"
            name="password"
            value={credentials.password}
            onChange={handleInputChange}
          />
          {passwordVisibility ? (
            <LuEyeOff onClick={() => setPasswordVisibility((prev) => !prev)} />
          ) : (
            <LuEye onClick={() => setPasswordVisibility((prev) => !prev)} />
          )}
        </div>
      </div>
      {!passwordPassed && !credentials.password ? (
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
                validationResults.noRepeat && credentials.password
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
              value={credentials.confirmPassword}
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
      <div className="signup-form__section main-btns">
        <button type="button" onClick={() => navigate("/")}>
          Cancel
        </button>
        <button type="submit">Sign Up</button>
      </div>
      <div className="signup-form__section switch-btn">
        <button type="button" onClick={() => navigate("/login")}>
          Log In
        </button>
      </div>
      <div className="signup-form__section error">
        {error && <p>{error}</p>}
      </div>
    </form>
  );
};

export default Signup;
