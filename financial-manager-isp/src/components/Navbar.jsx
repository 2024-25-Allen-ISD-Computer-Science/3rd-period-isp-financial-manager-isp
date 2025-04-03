import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/navstyle.css';

document.querySelectorAll('.scroll-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('data-target');
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
            window.scrollTo({
                top: targetSection.offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

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
                                    <Link class="scroll-link" data-target="HOME">Home</Link>
                                </li>
                                <li>
                                    <Link class="scroll-link" data-target="ABOUT">About Us</Link>
                                </li>
                                <li>
                                    <Link class="scroll-link" data-target="FAQ">FAQ</Link>
                                </li>
                                <li>
                                    <Link class="scroll-link" data-target="CONTACT">Contact</Link>
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
