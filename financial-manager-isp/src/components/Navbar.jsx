import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SignUp from './SignUp';
import Login from './Login';
import '../css/navstyle.css';

const Navbar = ({signUpClick, logInClick}) => {
    const [navOpen, setNavOpen] = useState(false);

    return (
        <>
            <header>
                <div className="navbar">
                    <div className="navcontainer">
                        <h1 className="title">Financial Manager ISP</h1>
                        <div className="hamburger" onClick={() => setNavOpen(!navOpen)}>
                            {navOpen ? 'X' : '☰'}
                        </div>

                        <div className={`nav-elements ${navOpen ? 'show' : ''}`}>
                            <ul>
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            <li>
                                <Link to="/about">About Us</Link>
                            </li>
                            <li>
                                <Link to="/faq">FAQ</Link>
                            </li>
                            <li>
                                <Link to="/contact">Contact</Link>
                            </li>
                            </ul>

                            <div className="auth-buttons">
                                <button onClick={signUpClick} className="filled-button">
                                    Sign Up
                                </button>
                                <button onClick={logInClick}>Log In</button>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
};

export default Navbar;
