import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import FormTemplate from "../Shared-Components/FormTemplate";
import "./styling/New-Page.css";

const New = () => {
  const API = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();
  const [car, setCar] = useState({
    year: "",
    make: "",
    model: "",
    trim: "",
    color: "",
    price: "",
    imgUrl: "",
    discontinued: false,
  });
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${API}`, { ...car, year: Number(car.year), price: Number(car.price) })
      .then(() => navigate("/"))
      .catch((err) => {
        if (err.response.data.error) {
          setError(err.response.data.error);
        } else {
          setError(err.response.data);
        }
      });
    setTimeout(() => setError(""), 3000);
  };

  return (
    <section className="new-car-container">
      <h1>New Car</h1>
      <FormTemplate
        car={car}
        setCar={setCar}
        handleSubmit={handleSubmit}
        error={error}
        navigate={navigate}
      />
    </section>
  );
};

export default New;
