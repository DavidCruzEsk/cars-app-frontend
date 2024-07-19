import {useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import {useComponentVisible} from '../../Custom-Hooks/useComponentVisible.js';
import {LogInContext} from '../../Context/LogInContext.jsx';
import {IoMdArrowDropdown} from 'react-icons/io';

const Welcome = () => {
  const {ref, isComponentVisible, setIsComponentVisible} =
    useComponentVisible(false);
  const navigate = useNavigate();

  const {user, setUser} = useContext(LogInContext);

  return (
    <div className="logged-container" ref={ref}>
      <div className="menu-positioning">
        <span onClick={() => setIsComponentVisible(prev => !prev)}>
          Welcome, {user.firstName}
          <IoMdArrowDropdown className="menu-arrow" />
        </span>
        {isComponentVisible && (
          <div className="menu">
            <span
              onClick={() => {
                setIsComponentVisible(prev => !prev);
                navigate('/profile');
              }}
            >
              My Profile
            </span>
            <span
              onClick={() => {
                setIsComponentVisible(prev => !prev);
                setUser(false);
                navigate('/');
              }}
            >
              Sign Out
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Welcome;
