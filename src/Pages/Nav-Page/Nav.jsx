import {Outlet, useNavigate} from 'react-router-dom';
import {useEffect, useState} from 'react';
import {LogInContext} from '../Context/LogInContext';
import axios from 'axios';
import './Styling/nav.css';
import Welcome from './Components/Welcome';

const Nav = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL_USERS;
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : false;
  });
  const [favorites, setFavorites] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      setFavorites({});
    } else {
      axios
        .get(`${BASE_URL}/favorites/${user.id}`)
        .then(res => {
          setFavorites(res.data);
        })
        .catch(err => {
          setFavorites({});
        });
    }
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  const checkPath =
    !window.location.href.includes('login') &&
    !window.location.href.includes('signup');

  return (
    <LogInContext.Provider value={{user, setUser}}>
      <nav className="nav-container">
        <div className="nav-container__title">
          <h1 onClick={() => navigate('/')}>Cars App</h1>
        </div>
        {user ? (
          <Welcome />
        ) : checkPath ? (
          <div className="nav-container__login">
            <button
              onClick={() => {
                navigate('/login');
              }}
            >
              Log In
            </button>
          </div>
        ) : (
          ''
        )}
      </nav>
      <Outlet />
    </LogInContext.Provider>
  );
};

export default Nav;
