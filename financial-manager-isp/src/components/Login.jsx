import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase.jsx';
import '../css/userauthspecialstyles.css';

const Login = ({closeLogIn, loginComplete}) => {

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [showPass, setShowPass] = useState(false);

    const emailRef = useRef(null);
    const passRef = useRef(null);

    const EmailUpd = (e) => {
        setEmail(e.target.value);
        setSubmitted(false);
    };

    const PassUpd = (e) => {
        setPassword(e.target.value);
        setSubmitted(false);
    };

    const SubClicked = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        if (emailRef.current) emailRef.current.style.border = '2px solid #ccc';
        if (passRef.current) passRef.current.style.border = '2px solid #ccc';

        if (email === "" || password === "") {
            setErrorMsg("Please fill out all fields.")
            if (email === "") { emailRef.current.style.border = '2px solid red'; }
            if (password === "") { passRef.current.style.border = '2px solid red'; }
        }

        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        });

        if (error) {
            setErrorMsg(error.message);
            setIsSubmitting(false);
        } else {
            setErrorMsg('');
            loginComplete();
            navigate('/Inner/Dashboard'); 
        }
    };

    return (
        <>
            <div id="logInOverlay" className="overlay">
                <div className="overlay-content">
                    <button id="closeLogInBtn" className="close-btn" onClick={closeLogIn}>X</button>
                    <h3>Log In</h3>
                    <form id="logInForm" onSubmit={SubClicked}>
                        <div className="form-group">
                        <input
                            ref={emailRef}
                            type="email"
                            id="logInEmail"
                            placeholder="Email"
                            value={email}
                            onChange={EmailUpd}
                            required
                        />
                        </div>
                        <div className="form-group">
                            <input
                                ref={passRef}
                                type={showPass ? 'text' : 'password'}
                                id="logInPassword"
                                placeholder="Password"
                                value={password}
                                onChange={PassUpd}
                                required
                            />
                            <button
                                type="button"
                                id="loginToggle"
                                className="icon-btn"
                                onClick={() => setShowPass((prev) => !prev)}
                            >
                            👁️
                            </button>
                        </div>
                        {errorMsg && (
                            <p id="logInError" className="error">
                            {errorMsg}
                            </p>
                        )}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            style={{
                            backgroundColor: isSubmitting ? '#ccc' : '#007bff',
                            cursor: isSubmitting ? 'not-allowed' : 'pointer',
                            border: 'none',
                            padding: '10px 20px',
                            color: '#fff',
                            fontSize: '16px',
                            }}
                        >
                            {isSubmitting ? 'Logging In...' : 'Log In'}
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
};

export default Login;
