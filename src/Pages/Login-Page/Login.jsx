import {useState, useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import {LogInContext} from '../Context/LogInContext';
import {LuEye} from 'react-icons/lu';
import {LuEyeOff} from 'react-icons/lu';
import './Styling/login.css';



const LogIn = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL_USERS;
  const navigate = useNavigate();
  const {setUser} = useContext(LogInContext);
  const [credentials, setCredentials] = useState({username: '', password: ''});
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    const {username, password} = credentials;
    if (!username || !password) {
      setError('Please fill in all fields');
      setTimeout(() => setError(''), 3000);
      return;
    }
    axios
      .post(`${BASE_URL}/login`, credentials)
      .then(res => {
        setUser(res.data);
        navigate('/');
      })
      .catch(err => {
        setError(err.response.data.error);
        setTimeout(() => setError(''), 3000);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <div className='login-form__right-panel'>
      </div>

      <div className="login-form__section">
        <h2>Log In</h2>
      </div>
      <div className="login-form__section">
        <label htmlFor="username">Username:</label>
        <div className="form-input">
        <input
          type="text"
          id="username"
          value={credentials.username}
          onChange={e =>
            setCredentials({...credentials, username: e.target.value})
          }
        />
        </div>
      </div>
      <div className="login-form__section">
        <label htmlFor="password">Password:</label>
        <div className="form-input">
          <input
            type={passwordVisibility ? 'text' : 'password'}
            id="password"
            value={credentials.password}
            onChange={e =>
              setCredentials({...credentials, password: e.target.value})
            }
          />
          {passwordVisibility ? (
            <LuEyeOff onClick={() => setPasswordVisibility(prev => !prev)} />
          ) : (
            <LuEye onClick={() => setPasswordVisibility(prev => !prev)} />
          )}
        </div>
      </div>
      <div className="login-form__section main-btns">
        <button type="button" onClick={() => navigate('/')}>
          Cancel
        </button>
        <button type="submit">Log In</button>
      </div>
      <div className="login-form__section switch-btn">
        <button type="button" onClick={() => navigate('/signup')}>
          Sign Up
        </button>
      </div>
      <div className="login-form__section error">{error && <p>{error}</p>}</div>

      <div className='login-form__left-panel'>
      </div>
    </form>
  );
};

export default LogIn;
