import React from 'react';

const Login = ({closeLogIn}) => {

    return (
        <>
            <div id="logInOverlay" className="overlay">
                <div className="overlay-content">
                    <button id="closeLogInBtn" className="close-btn" onClick={closeLogIn}>X</button>
                    <h3>Log In</h3>
                    <form id="logInForm">
                        <div className="form-group">
                            <input type="text" id="logInUsername" placeholder="Username" required />
                        </div>
                        <div className="form-group">
                            <input type="password" id="logInPassword" placeholder="Password" required />
                            <button type="button" id="loginToggle" className="icon-btn">👁️</button>
                        </div>
                        <button type="submit">Log In</button>
                        <p id="logInError"></p>
                    </form>
                </div>
            </div>
        </>
    )
};

export default Login;
