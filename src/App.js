import React, { useContext } from 'react'
import Home from './pages/home/home'
import "./app.scss"
import Profile from './pages/profile/Profile'
import EditProfile from './pages/editProfile/EditProfile'
import Login from "./pages/login/Login"
import Register from './pages/register/Register'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./style/dark.scss"
import { DarkModeContext } from './Context/darkModeContext'
import { AuthContext } from './Context/AuthContext';
import { Navigate } from 'react-router-dom'

const App = () => {
  const { darkMode } = useContext(DarkModeContext);
  const { currentUser } = useContext(AuthContext);

  const AuthRoute = ({ children }) => {

    if (!currentUser) {
      return <Navigate to="/login" />

    }
    return children;
  }


  return (



    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter> 
           <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/"
          element={
            <AuthRoute>
              <Home />
            </AuthRoute>
          }
        />
        <Route
          path="/profile/:userName"
          element={
            <AuthRoute>
              <Profile />
            </AuthRoute>
          }
        />
        <Route
          path="/profile/:userName/edit"
          element={
            <AuthRoute>
              <EditProfile />
            </AuthRoute>
          }
        />
      </Routes>
      </BrowserRouter>

    </div>







  )
}

export default App