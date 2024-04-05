import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import SignUp from './components/SignUp/SignUp';
import ProfileMaking from './components/ProfileMaking/ProfileMaking';
import Role from './components/Role/Role';
import Verification from './components/Verification/Verification';
import React from 'react';


function App() {

  return(
    <Router>
      <Routes >
      <Route path="/" element={<SignUp />} />
      <Route path="/profilemaking/:username" element={<ProfileMaking />} />
      <Route path='/role/:username' element={<Role />} />
      <Route path='/verification/:username' element={<Verification />} />
      </Routes>
    </Router>
  )
}

export default App
