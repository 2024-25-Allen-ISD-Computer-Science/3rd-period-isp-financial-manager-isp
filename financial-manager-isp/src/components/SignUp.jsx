import React from 'react';

const SignUp = ({closeSignUp}) => {
    return (
        <>
            <div id="signUpOverlay" className="overlay">
                <div className="overlay-content">
                    <button id="closeSignUpBtn" className="close-btn" onClick={closeSignUp}>X</button>
            
                    <h3>Sign Up</h3>
                    <form id="signUpForm">
                        <div className="form-group">
                            <input type="text" id="signUser" placeholder="Username" required />
                        </div>
                        <div className="form-group">
                            <input type="email" id="signEmail" placeholder="Email" required />
                        </div>
                        <div className="form-group">
                            <input type="password" id="signPass" placeholder="Password" required />
                            <button type="button" id="toggleSignBtn" className="icon-btn">👁️</button>
                        </div>
                        <div className="form-group">
                            <input type="password" id="signPassConf" placeholder="Confirm Password" required />
                            <button type="button" id="confirmSignBtn" className="icon-btn">👁️</button>
                        </div>
                        <button type="submit">Sign Up</button>
                        <p id="signUpError"></p>
                    </form>
                </div>
            </div>
        </>
    );
};

export default SignUp;
