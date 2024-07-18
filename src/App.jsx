import {useState} from 'react';
import {Routes, Route} from 'react-router-dom';

import Nav from './Pages/Nav-Page/Nav';
import Home from './Pages/Home-Page/Home';
import New from './Pages/New-Page/New';
import Edit from './Pages/Edit-Page/Edit';
import Show from './Pages/Show-Page/Show';
import FourOFour from './Pages/FourOFour-Page/FourOFour';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Nav />}>
          <Route index element={<Home />} />
          <Route path={'/:id'} element={<Show />} />
          <Route path={'/new'} element={<New />} />
          <Route path={'/edit/:id'} element={<Edit />} />
        </Route>
        <Route path={'*'} element={<FourOFour />} />
      </Routes>
    </div>
  );
}

export default App;
