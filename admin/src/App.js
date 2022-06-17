import React from 'react'
import UserPageContainer from './components/users/UserPageContainer'
import Login from './components/Login/LoginPage'
import { Routes, Route, Link } from "react-router-dom"


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
