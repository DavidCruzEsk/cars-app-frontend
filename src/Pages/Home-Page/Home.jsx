import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { LogInContext } from "../Context/LogInContext";
import { CarsContext } from "../Context/CarsContext";
import "./Styling/home.css";
import Car from "./Components/Car";

const Home = () => {
  const [cars, setCars] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const API = import.meta.env.VITE_BASE_URL;
  const USERS = import.meta.env.VITE_BASE_URL_USERS;
  const navigate = useNavigate();
  const { user } = useContext(LogInContext);

  useEffect(() => {
    axios
      .get(`${API}`)
      .then((res) => setCars(res.data))
      .catch((err) => navigate("*"));
  }, []);

  useEffect(() => {
    if (user) {
      axios.get(`${USERS}/favorites/${user.id}`).then((res) => {
        if (res.data.carIds) {
          setFavorites(res.data.carIds);
        }
      });
    } else {
      setFavorites([]);
    }
  }, [user]);

  return (
    <CarsContext.Provider value={{ favorites, setFavorites }}>
      <main className="home-container">
        <video autoPlay mute loop className="home-container__home-bg-video">
          <source src="/videos/9150545-hd_1920_1080_24fps.mp4" type="video/mp4" />
        </video>
        <header className="home-container__content-header">
          <h1 className="title">Cars</h1>
          {favorites.length ? (
            <button
              className="favorites-toggle"
              onClick={() => setShowFavorites((prev) => !prev)}
            >
              Show {!showFavorites ? "Favorited" : "All"} Cars{" "}
              {!showFavorites && "Only"}
            </button>
          ) : (
            ""
          )}
          {user ? (
            <button className="create-user" onClick={() => navigate("/new")}>
              Add A Car
            </button>
          ) : (
            ""
          )}
        </header>
        <div className="home-container__content-grid">
          {showFavorites &&
            cars
              .filter((car) => favorites.includes(car.id))
              .map((car) => (
                <Car
                  car={car}
                  key={car.id}
                />
              ))}
          {!showFavorites &&
            cars.map((car) => (
              <Car
                car={car}
                key={car.id}
              />
            ))}
        </div>
      </main>
    </CarsContext.Provider>
  );
};

export default Home;
