import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MdFavoriteBorder } from "react-icons/md";
import { MdFavorite } from "react-icons/md";
import { LogInContext } from "../../Context/LogInContext.jsx";
import { CarsContext } from "../../Context/CarsContext.jsx";

const Car = ({ car }) => {
  const { user } = useContext(LogInContext);
  const { favorites, setFavorites } = useContext(CarsContext);
  const USERS = import.meta.env.VITE_BASE_URL_USERS;
  const navigate = useNavigate();
  const { id, make, year, model, imgUrl } = car;
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (favorites.includes(id)) {
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
    }
  }, [favorites]);

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
        {!isFavorite ? (
          <p>
            <MdFavoriteBorder
              onClick={(e) => {
                e.stopPropagation();
                axios
                  .post(`${USERS}/add-favorite`, {
                    carId: id,
                    userId: user.id,
                  })
                  .then((res) => {
                    if (res.data.carIds) {
                      setFavorites(res.data.carIds);
                    } else {
                      setFavorites([]);
                    }
                  });
              }}
            />
          </p>
        ) : (
          <p>
            <MdFavorite
              onClick={(e) => {
                e.stopPropagation();
                axios
                  .delete(`${USERS}/remove-favorite/${user.id}/${id}`)
                  .then((res) => {
                    if (res.data.carIds) {
                      setFavorites(res.data.carIds);
                    } else {
                      setFavorites([]);
                    }
                  });
              }}
            />
          </p>
        )}
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
