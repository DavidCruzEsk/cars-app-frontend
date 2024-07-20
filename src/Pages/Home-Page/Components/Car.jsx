import {useNavigate} from 'react-router-dom';

const Car = ({car}) => {
  const navigate = useNavigate();
  const {id, make, year, model, imgUrl} = car;
  return (
    <div onClick={() => navigate(`/${id}`)} className="car-block" key={id}>
      <img
        src={imgUrl}
        alt="car-photo"
        className="car-block__img"
        width="200px"
        height="125px"
      />
      <div className="car-block__details">
        <h3 className="make">{make}</h3>
        <h2 className="model">
          <i>{model}</i>
        </h2>
        <p className="year">&#40;{year}&#41;</p>
      </div>
    </div>
  );
};

export default Car;
