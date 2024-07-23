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
      <div className="car-block__img">
        <img src={imgUrl} alt="car-photo" width="200px" height="125px" />
      </div>
      <div className="car-block__details">
        {user && (
          <div className="favorited">
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
          </div>
        )}
        <h3 className="info">
          {make} {model} {year}
        </h3>
      </div>
    </div>
  );
};

export default Car;
