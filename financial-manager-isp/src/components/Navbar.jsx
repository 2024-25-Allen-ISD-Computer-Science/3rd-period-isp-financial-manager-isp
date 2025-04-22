import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../css/navstyle.css';

const Navbar = ({inner, user, signUpClick, logInClick}) => {
    const [navOpen, setNavOpen] = useState(false);

    useEffect(() => {
        const handleScrollLinkClick = (e) => {
            const link = e.target.closest('.scroll-link');
            if (!link) return;

            e.preventDefault();
            const targetId = link.getAttribute('data-target');
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop,
                    behavior: 'smooth'
                });
            }

        };

        document.addEventListener('click', handleScrollLinkClick);

        return () => {
            document.removeEventListener('click', handleScrollLinkClick);
        };
    }, []);

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
                                    <Link className="scroll-link" data-target="HOME">Home</Link>
                                </li>
                                <li>
                                    <Link className="scroll-link" data-target="ABOUT">About Us</Link>
                                </li>
                                <li>
                                    <Link className="scroll-link" data-target="FAQ">FAQ</Link>
                                </li>
                                <li>
                                    <Link className="scroll-link" data-target="CONTACT">Contact</Link>
                                </li>
                            </ul>
                            }
                            <div className="auth-buttons">
                                {!inner &&
                                    <>
                                        <button onClick={signUpClick} className="filled-button">Sign Up</button>
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
