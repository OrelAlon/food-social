import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Profile from "./pages/profile/Profile";
import Restaurant from "./pages/restaurant/Restaurant";
import AddRestaurant from "./pages/addRestaurant/AddRestaurant";

import "./App.css";

import React from "react";

function App() {
  const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);
    if (!user) {
      return <Navigate to='/login' />;
    }

    return children;
  };

  return (
    <>
      <div className='App'>
        <Router>
          <Routes>
            <Route path='/'>
              <Route
                index
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }
              />
              <Route path='/login' element={<Login />} />

              <Route path='/register' element={<Register />} />
              <Route path='/addrestaurant' element={<AddRestaurant />} />
              <Route path='/profile/:username' element={<Profile />} />
              <Route
                path='/restaurant/:restaurantname'
                element={<Restaurant />}
              />
            </Route>
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
