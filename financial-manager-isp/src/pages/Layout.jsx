import { Outlet, useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { supabase } from '../lib/supabase.jsx';
import Navbar from "../components/Navbar";
import SignUp from "../components/SignUp.jsx";
import Login from "../components/Login.jsx";

const Layout = () => {
  const location = useLocation();
  const [username, setUsername] = useState('');
  const [showSignUp, setShowSignUp] = useState(false);
  const [showLogIn, setShowLogIn] = useState(false);
  const [innerNavbar, setInnerNavbar] = useState(false);
  const [loadingUser, setLoadingUser] = useState(false);

  const signUpClickEvent = () => {
    if (!showSignUp && showLogIn) {
      setShowLogIn(false);
    }
    setShowSignUp(!showSignUp);
  };

  const logInClickEvent = () => {
    if (!showLogIn && showSignUp) {
      setShowSignUp(false);
    }
    setShowLogIn(!showLogIn);
  };

  const logInComplete = () => {
    setShowLogIn(false);
  };
  useEffect(() => {
    const fetchUserProfile = async () => {
        setLoadingUser(true);
        setUsername('');
        const {
            data: { user },
            error: userError,
        } = await supabase.auth.getUser();
        if (userError || !user) {
            if (userError) {

                 if (location.pathname.includes("/Inner")) {
                    console.error('Error fetching user session on inner page:', userError.message);
                 }
            }
            setUsername('');
            setLoadingUser(false);
            return;
        }


        try {
            const { data, error: profileError } = await supabase
                .from('user_data')
                .select('username')
                .eq('id', user.id)
                .single();

            if (profileError) {
                console.error('Error fetching user profile:', profileError);
                setUsername('');
            } else if (data) {
                setUsername(data.username);
            } else {

                console.warn('User found but no profile data in user_data table.');
                setUsername(''); // Or set a default/placeholder
            }
        } catch (catchError) {
            console.error('Caught error during profile fetch:', catchError);
            setUsername('');
        } finally {
             setLoadingUser(false);
        }
    };


    if (location.pathname.includes("/Inner")) {
      setInnerNavbar(true);
      fetchUserProfile();
    } else {

      setInnerNavbar(false);
      setUsername('');
      setLoadingUser(false); 
    }

  }, [location]);

  return (
    <>
      <Navbar inner={innerNavbar} user={username} signUpClick={signUpClickEvent} logInClick={logInClickEvent} />
      {showSignUp && <SignUp closeSignUp={signUpClickEvent} loginRedirect={logInClickEvent} />}
      {showLogIn && <Login closeLogIn={logInClickEvent} loginComplete={logInComplete} />}
      <Outlet />
    </>
  );
};

export default Layout;