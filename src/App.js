import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar.jsx';
import Login from './pages/login.jsx';
import NotFound from './components/NotFound.jsx';
import State from './context/state.js';
import User from "./pages/User.jsx";
import { useJwt } from "react-jwt";
import Withdraws from './pages/Withdraws';
import Deposits from './pages/Deposits';
import UserByid from './pages/UserByid.jsx';

const App = () => {
  const [loggedin, setLoggedin] = useState(false);
  const { decodedToken } = useJwt(localStorage.getItem('panel-paysyncr-token'));

  useEffect(() => {
    if (decodedToken?.id) {
      setLoggedin(true)
    }
  }, [decodedToken]);

  return (
    <div className="appbody">
      <State>
        <Router>

          {!loggedin ? (
            <Routes>
              <Route path="*" element={<Login />} />
            </Routes>
          ) : (
            <>
              <Navbar />
              <Routes>
                <Route path="/" element={<User />} />
                <Route path="/user/:id" element={<UserByid />} />
                <Route path="/withdraws" element={<Withdraws />} />
                <Route path="/deposits" element={<Deposits />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </>
          )}


        </Router>
      </State>
    </div>
  );
};

export default App;

