import { LogInContext } from "../Context/LogInContext";
import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaUserEdit } from "react-icons/fa";
import { FaUserTimes } from "react-icons/fa";
import { formatDate } from "../Helper-Functions/formatDate";
import Car from "./Components/Car";
import "./Styling/profile.css";

const Profile = () => {
  const API = import.meta.env.VITE_BASE_URL;
  const BASE_URL = import.meta.env.VITE_BASE_URL_USERS;
  const { user } = useContext(LogInContext);
  const navigate = useNavigate();
  const { firstName, lastName, email, username, birthDate, createdAt } = user;
  const [favorites, setFavorites] = useState([]);
  const [cars, setCars] = useState([]);

  useEffect(() => {
    axios.get(`${BASE_URL}/favorites/${user.id}`).then((res) => {
      if (res.data.carIds) {
        setFavorites(res.data.carIds);
      }
    });
    axios.get(`${API}`).then((res) => setCars(res.data));
  }, []);

  return (
    <div className="profile-page">
      <div className="profile-page__info">
        <div className="info">
          <h1>
            Name: {firstName} {lastName}
          </h1>
          <h2>Username: {username}</h2>
          <h2>Email: {email}</h2>
          <h2>Birth Date: {formatDate(birthDate)}</h2>
          <h2>Account Created: {formatDate(createdAt)}</h2>
        </div>
        <div className="profile-page__buttons">
          <button onClick={() => navigate("/change-password")}>
            <FaUserEdit />
          </button>
          <button onClick={() => navigate("/delete-user")}>
            <FaUserTimes />
          </button>
        </div>
      </div>
      <div className="profile-page__favorites">
        <h1>Favorites</h1>
        {!favorites.length ? (
          <p>You have no favorites</p>
        ) : (
          cars
            .filter((car) => favorites.includes(car.id))
            .map((car) => <Car key={car.id} car={car} />)
        )}
      </div>
    </div>
  );
};

export default Profile;
