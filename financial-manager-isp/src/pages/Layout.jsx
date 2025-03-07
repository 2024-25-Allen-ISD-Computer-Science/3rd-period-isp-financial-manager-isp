import { Outlet, useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { supabase } from '../lib/supabase.jsx';
import Navbar from "../components/Navbar";
import SignUp from "../components/SignUp";
import Login from "../components/Login";

const Layout = () => {
  const location = useLocation();
  const [username, setUsername] = useState('');
  const [showSignUp, setShowSignUp] = useState(false);
  const [showLogIn, setShowLogIn] = useState(false);
  const [innerNavbar, setInnerNavbar] = useState(false);
  
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
    setShowLogIn(false);
  }

  useEffect(() => {
    if (location.pathname.includes("/Inner")) {
      setInnerNavbar(true);
    } else {
      setInnerNavbar(false);
    }
  }, [location]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) {
        console.error('damn they dont wanna give you that user', userError);
        return;
      }

      if (user) {
        const { data, error: profileError } = await supabase
          .from('user_data')
          .select('username')
          .eq('id', user.id)
          .single();

        if (profileError) {
          console.error('damn they dont wanna give you that profile', profileError);
        } else if (data) {
          setUsername(data.username);
        }
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <>
      <Navbar inner={innerNavbar} user={username} signUpClick={signUpClickEvent} logInClick={logInClickEvent} />
      <Outlet />
      {showSignUp && <SignUp closeSignUp={signUpClickEvent} loginRedirect={logInClickEvent}/>}
      {showLogIn && <Login closeLogIn={logInClickEvent} loginComplete={logInComplete}/>}
    </>
  )
};

export default Layout;