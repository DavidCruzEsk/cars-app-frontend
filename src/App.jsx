import {Routes, Route} from 'react-router-dom';

import Nav from './Pages/Nav-Page/Nav';
import Home from './Pages/Home-Page/Home';
import New from './Pages/New-Page/New';
import Edit from './Pages/Edit-Page/Edit';
import Show from './Pages/Show-Page/Show';
import FourOFour from './Pages/FourOFour-Page/FourOFour';
import Login from './Pages/Login-Page/Login';
import Signup from './Pages/Signup-Page/Signup';
import Profile from './Pages/Profile-Page/Profile';
import ChangePassword from './Pages/ChangePassword-Page/ChangePassword';
import DeleteUser from './Pages/DeleteUser-Page/DeleteUser';

function App() {
  return (
      <Routes>
        <Route path="/" element={<Nav />}>
          <Route index element={<Home />} />
          <Route path={'/:id'} element={<Show />} />
          <Route path={'/new'} element={<New />} />
          <Route path={'/edit/:id'} element={<Edit />} />
          <Route path={'/login'} element={<Login />} />
          <Route path={'/signup'} element={<Signup />} />
          <Route path={'/profile'} element={<Profile />} />
          <Route path={'/change-password'} element={<ChangePassword />} />
          <Route path={'/delete-user'} element={<DeleteUser />} />
        </Route>
        <Route path={'*'} element={<FourOFour />} />
      </Routes>
  );
}

export default App;
