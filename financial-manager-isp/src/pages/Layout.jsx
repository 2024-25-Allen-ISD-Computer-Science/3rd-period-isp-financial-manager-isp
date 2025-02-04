import { Outlet, useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import SignUp from "../components/SignUp";
import Login from "../components/Login";

const Layout = () => {
  const location = useLocation();

  const [showSignUp, setShowSignUp] = useState(false);
  const [showLogIn, setShowLogIn] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  
  const signUpClickEvent = () => {
    if (!showSignUp && showLogIn) {
      setShowSignUp(!showLogIn);
    }
    setShowSignUp(!showSignUp);
  };
  
  const logInClickEvent = () => {
    if (!showLogIn && showSignUp) {
      setShowSignUp(!showSignUp);
    }
    setShowLogIn(!showLogIn);
  };

  const logInComplete = () => {
    setShowNavbar(false);
    setShowLogIn(false);
  }

  useEffect(() => {
    if (location.pathname.includes("/Inner")) {
      setShowNavbar(false);
    } else {
      setShowNavbar(true);
    }
  }, [location]);

  return (
    <>
      {showNavbar && <Navbar signUpClick={signUpClickEvent} logInClick={logInClickEvent} />}
      <Outlet />
      {showSignUp && <SignUp closeSignUp={signUpClickEvent} loginRedirect={logInClickEvent}/>}
      {showLogIn && <Login closeLogIn={logInClickEvent} loginComplete={logInComplete}/>}
    </>
  )
};

export default Layout;