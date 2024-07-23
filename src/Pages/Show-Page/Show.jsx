import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { LogInContext } from "../Context/LogInContext";
import { useComponentVisible } from "../Custom-Hooks/useComponentVisible";
import "./styling/Show-Page.css";
import { MdFavoriteBorder } from "react-icons/md";
import { MdFavorite } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { TiEdit } from "react-icons/ti";
import { TiArrowBackOutline } from "react-icons/ti";
import Comment from "./Components/Comment";

const Show = () => {
  const API = import.meta.env.VITE_BASE_URL;
  const USERS = import.meta.env.VITE_BASE_URL_USERS;
  const { user } = useContext(LogInContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState({});
  const [favorites, setFavorites] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const { isComponentVisible, setIsComponentVisible, ref } =
    useComponentVisible(false);
  const [comments, setComments] = useState([]);
  const { year, make, model, trim, color, price, imgUrl, discontinued } = car;
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    axios
      .get(`${API}/${id}`)
      .then((res) => setCar(res.data))
      .catch((err) => navigate("*"));
  }, []);

  useEffect(() => {
    axios
      .get(`${USERS}/comments/${id}`)
      .then((res) => !res.data.error && setComments(res.data));
  }, [comments]);

  useEffect(() => {
    axios.get(`${USERS}/favorites/${user.id}`).then((res) => {
      if (res.data.carIds) {
        setFavorites(res.data.carIds);
      }
    });
  }, []);

  useEffect(() => {
    if (favorites.includes(Number(id))) {
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
    }
  }, [favorites]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${USERS}/add-comment`, {
        userId: user.id,
        carId: Number(id),
        comment: newComment,
      })
      .then((res) => {
        if (res.data.comments) {
          setComments(res.data.comments);
          setNewComment("");
        }
      });
  };

  return (
    <main className="show-container">
      <div className="back-home">
        <button onClick={() => navigate(-1)}>
          <TiArrowBackOutline />
        </button>
      </div>
      <section className="show-container__car-info">
        <video  autoPlay mute loop className="show-car-bg">
          <source src="/videos/5926164-hd_1920_1080_30fps.mp4" type="video/mp4"/>
        </video>

        <div className="car-img">
          <img src={imgUrl} alt="car" />
        </div>
        <div className="car-details">
          <h1>
            {year} {make} {model} {trim}
          </h1>
          <p>Color: {color}</p>
          <p>Price: $ {price}</p>
          <p>{discontinued ? "Discontinued" : "Available"}</p>
        </div>
        {user && (
          <div className="show-container__btns" ref={ref}>
            {!isFavorite ? (
              <MdFavoriteBorder
                onClick={() => {
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
            ) : (
              <MdFavorite
                onClick={() => {
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
            )}
            <TiEdit onClick={() => navigate(`/edit/${id}`)} />
            <div className="delete-car">
              <MdDelete onClick={() => setIsComponentVisible(true)} />
              {isComponentVisible && (
                <div className="delete-car__window">
                  <button
                    onClick={() => {
                      axios.delete(`${API}/${id}`).then((res) => navigate("/"));
                    }}
                  >
                    Yes
                  </button>
                  <button onClick={() => setIsComponentVisible(false)}>
                    No
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </section>
      <section className="show-container__comments-section">
        <h2>Comments</h2>
        {user && (
          <form onSubmit={handleSubmit} className="comment-form">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
            />
            <button>Submit</button>
          </form>
        )}
        <div className="comments">
          {comments.map((comment) => (
            <Comment
              key={comment.id}
              comment={comment}
              setComments={setComments}
              carId={id}
            />
          ))}
        </div>
      </section>
    </main>
  );
};

export default Show;
