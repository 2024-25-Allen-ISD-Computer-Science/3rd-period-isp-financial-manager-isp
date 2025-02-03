import React, { useState, useRef } from 'react';
import { supabase } from '../lib/supabase.jsx'
import '../css/userauthspecialstyles.css'

const SignUp = ({closeSignUp}) => {

    const [username, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmedPassword, setConfirmedPassword] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);
    const [errorMsgs, setErrorMessages] = useState([]);
    const [showPass, setShowPass] = useState(false);
    const [showConfirmPass, setShowConfirmPass] = useState(false);

    const nameField = useRef(null);
    const emailField = useRef(null);
    const passField = useRef(null);
    const confPassField = useRef(null);

    const NameUpd = (e) => {
        setName(e.target.value);
        setSubmitted(false);
    };

    const EmailUpd = (e) => {
        setEmail(e.target.value);
        setSubmitted(false);
    };

    const PassUpd = (e) => {
        setPassword(e.target.value);
        setSubmitted(false);
    };

    const PassConfUpd = (e) => {
        setConfirmedPassword(e.target.value);
        setSubmitted(false);
    };


    const SubClicked = async (e) => {
        e.preventDefault();
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/;

        nameField.current.style.border = '2px solid #ccc';
        emailField.current.style.border = '2px solid #ccc';
        passField.current.style.border = '2px solid #ccc';
        confPassField.current.style.border = '2px solid #ccc';
        let errors = [];
    
        if (username === "" || email === "" || password === "" || confirmedPassword === "") {
            errors.push({ id: 'fillallfields', message: 'Please fill out all fields.' });
            if (username === "") { nameField.current.style.border = '2px solid red'; }
            if (email === "") { emailField.current.style.border = '2px solid red'; }
            if (password === "") { passField.current.style.border = '2px solid red'; }
            if (confirmedPassword === "") { confPassField.current.style.border = '2px solid red'; }
        }
        if (password !== confirmedPassword) {
            errors.push({ id: 'passmatch', message: 'Passwords must match.' });
            passField.current.style.border = '2px solid red';
            confPassField.current.style.border = '2px solid red';
        }
        if (!passwordRegex.test(password)) {
            errors.push({ id: 'weakpass', message: 'Password must contain at least one number, special character, and uppercase letter.' });
            passField.current.style.border = '2px solid red';
        }
    
        const { data, error } = await supabase.auth.signUp({email, password});
        if (error) {
            errors.push({ id: 'signupfail', message: data });
        }

        if (errors.length > 0) {
            setError(true);
            setErrorMessages(errors);
            setSubmitted(false);
        } else {
            setError(false);
            setErrorMessages([]);
            setSubmitted(true);
        }
    };

    const HellYes = () => {
        return (
            <p
                className="success"
                style={{
                    display: submitted ? "" : "none",
                }}
            >
                Registration successful, taking you to login...
            </p>
        );
    };

    const HellNo = () => {
        return (
            <ul
                className="error"
                style={{
                    display: error ? "" : "none",
                }}
            >
                {errorMsgs.map(err => (
                    <li key={err.id}>{err.message}</li>
                ))}
            </ul>
        );
    };

    return (
        <>
            <div id="signUpOverlay" className="overlay">
                <div className="overlay-content">
                    <button id="closeSignUpBtn" className="close-btn" onClick={closeSignUp}>X</button>
            
                    <h3>Sign Up</h3>
                    <form id="signUpForm">
                        <div className="form-group">
                            <input ref={nameField} type="text" id="signUser" placeholder="Username" onChange={NameUpd} required />
                        </div>
                        <div className="form-group">
                            <input ref={emailField} type="email" id="signEmail" placeholder="Email" onChange={EmailUpd}  required />
                        </div>
                        <div className="form-group">
                            <input ref={passField} type={showPass ? "text" : "password"} id="signPass" placeholder="Password" onChange={PassUpd} required />
                            <button
                                type="button"
                                id="toggleSignBtn"
                                className="icon-btn"
                                onClick={() => setShowPass(prev => !prev)}
                            >
                                👁️
                            </button>
                        </div>
                        <div className="form-group">
                            <input ref={confPassField} type={showConfirmPass ? "text" : "password"} id="signPassConf" placeholder="Confirm Password" onChange={PassConfUpd} required />
                            <button
                                type="button"
                                id="confirmSignBtn"
                                className="icon-btn"
                                onClick={() => setShowConfirmPass(prev => !prev)}
                            >
                                👁️
                            </button>
                        </div>
                        <div id="signUpResult">
                            {HellYes()}
                            {HellNo()}
                        </div>
                        <button type="submit" onClick={SubClicked}>Sign Up</button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default SignUp;
