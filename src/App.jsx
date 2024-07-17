import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'

import Nav from './components/Nav'

import Home from './pages/Home'
import New from './pages/New'
import Edit from './pages/Edit'
import Show from './pages/Show'
import FourOFour from './pages/FourOFour'

function App() {

  return (
    <div>
      <Routes>
        <Route path='/' element={<Nav />} >
          <Route index element={<Home />}/>
          <Route path={'/:id'} element={<Show />}/>
          <Route path={'/new'} element={<New />}/>
          <Route path={'/edit/:id'} element={<Edit />}/>
        </Route>
          <Route path={'*'} element={<FourOFour />}/>
      </Routes>
    </div>
  )
}

export default App
