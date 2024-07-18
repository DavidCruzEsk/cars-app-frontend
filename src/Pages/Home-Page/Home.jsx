import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import './Styling/home.css';
import Car from './Components/Car';

const Home = () => {
  const [cars, setCars] = useState([]);
  const API = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API}`)
      .then(res => setCars(res.data))
      .catch(err => navigate('*'));
  }, []);

  // when marco pushes Humps, convert the cars variables into camelCase.
  return (
    <main className="home-container">
      <header className="home-container__content-header">
        <h1 className="title">Cars</h1>
        <h3 className="link">Link</h3>
      </header>
      <div className="home-container__content-grid">
        {cars.map(car => {
          return <Car car={car} key={car.id} />;
        })}
      </div>
    </main>
  );
};

export default Home;
