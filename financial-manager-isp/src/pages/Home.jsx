import React, {useState} from 'react';
import Navbar from '../components/Navbar';
import Login from '../components/Login';
import SignUp from '../components/SignUp';
import '../css/indexstyle.css';


const Home = () => {

    const [showSignUp, setShowSignUp] = useState(false);
    const [showLogIn, setShowLogIn] = useState(false);

    const signUpClickEvent = () => {
        setShowSignUp(!showSignUp);
    };

    const logInClickEvent = () => {
        setShowLogIn(!showLogIn);
    };

    return (
        <>
          <main>
          <Navbar signUpClick={signUpClickEvent} logInClick={logInClickEvent} />
            <div id="splash-wrapper">
              <div id="splash">
                <div id="splashcontainer">
                  <h1><span className="outline">Learn how to</span><br /><span id="typewrite"></span></h1>
                  <p>We aim to make managing your finances easily understandable and accessible <br />by providing you with various tools designed to assist your fiscal needs.</p>
                </div>
              </div>
              <div id="splash-image">
                <img src="https://raw.githubusercontent.com/2024-25-Allen-ISD-Computer-Science/3rd-period-isp-financial-manager-isp/refs/heads/main/public/accessiblefiles/FPXqiSR%20-%20Imgur.gif" />
              </div>
            </div>
    
            <div className="buffer" />
    
            <div className="fill-partway imgdesc">
              <div className="spanholder">
                <h4>Welcome to the webpage for our Financial Managner ISP!</h4>
                <span className="yapping">
                  This website aims to make managing your finances easily understandable and accessible. This project is currently a work in progress and we will continue to add more features as it continues. This site will eventually be able to track basic financial history, show and manage your income and expenses, and provide financial advice and access to information to improve your financial literacy.<br /><br />
                  This website was designed by Maci Siratt, Thomas Roney, David Kwon, Joseph Baril, and Nathan Charles.
                </span>
              </div>
            </div>
          </main>
          {showSignUp && <SignUp closeSignUp={signUpClickEvent}/>}
          {showLogIn && <Login closeLogIn={logInClickEvent}/>}
        </>
    )
  };
  
  export default Home;