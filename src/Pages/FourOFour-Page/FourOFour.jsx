import React from "react";
import { useNavigate } from "react-router-dom";
import fourOfour from "/404.webp";
import './styling/FourOFour.css'

const FourOFour = () => {
  const navigate = useNavigate();

  return (
    <div className="not-found">
        <img src={fourOfour} alt="fourOfour-img" />
        <button onClick={() => navigate("/")}>Home</button>
    </div>
  );
};

export default FourOFour;
