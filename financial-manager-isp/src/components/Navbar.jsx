import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/navstyle.css';

const Navbar = ({inner, user, signUpClick, logInClick}) => {
    const [navOpen, setNavOpen] = useState(false);

    return (
        <>
            <header>
                <div className={`navbar ${inner ? '' : 'fix'}`}>
                    <div className="navcontainer">
                        <h1 className="title">Financial Manager ISP</h1>
                        <div className="hamburger" onClick={() => setNavOpen(!navOpen)}>
                            {navOpen ? 'X' : '☰'}
                        </div> 
                        <div className={`nav-elements ${navOpen ? 'show' : ''}`}>
                            {!inner && 
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
                            }
                            <div className="auth-buttons">
                                {!inner &&
                                    <>
                                        <button onClick={signUpClick} className="filled-button">
                                            Sign Up
                                        </button>
                                        <button onClick={logInClick}>Log In</button>
                                    </>
                                }
                                {inner &&
                                    <>
                                        <button className="filled-button">
                                            <div className="profileicon btnicon"></div><p>{user ? user : 'user'}</p>
                                        </button>
                                        <button>
                                            <div className="settingicon btnicon"></div><p>Settings</p>
                                        </button>
                                    </>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
};

export default Navbar;
