import { useNavigate } from "react-router-dom";

const Car = ({ car }) => {
  const navigate = useNavigate();
  const { imgUrl, year, make, model } = car;

  return (
    <div className="mini-car-info" onClick={() => navigate(`/${car.id}`)}>
      <img src={imgUrl} alt="carPic" />
      <div className="mini-car-info__text">
        <p>{year}</p>
        <p>{make}</p>
        <p>{model}</p>
      </div>
    </div>
  );
};

export default Car;
