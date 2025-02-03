document.addEventListener('DOMContentLoaded', () => {
    // Get references to the overlay elements
    const signUpOverlay = document.getElementById('signUpOverlay');
    const logInOverlay = document.getElementById('logInOverlay');

    // Get the navigation buttons
    const signUpBtn = document.getElementById('signUpBtn');
    const logInBtn = document.getElementById('logInBtn');
    const closeSignUpBtn = document.getElementById('closeSignUpBtn');
    const closeLogInBtn = document.getElementById('closeLogInBtn');

    // Show the overlays when the buttons are clicked
    if (signUpBtn && logInBtn) {
        signUpBtn.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default anchor behavior
            signUpOverlay.style.display = 'flex'; // Show Sign Up overlay
            logInOverlay.style.display = 'none';
            
        });

        logInBtn.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default anchor behavior
            logInOverlay.style.display = 'flex'; // Show Log In overlay
            signUpOverlay.style.display = 'none';
        });
    }

    // Close the overlays when the close buttons are clicked
    if (closeSignUpBtn) {
        closeSignUpBtn.addEventListener('click', () => {
            signUpOverlay.style.display = 'none'; // Hide Sign Up overlay
        });
    }

    if (closeLogInBtn) {
        closeLogInBtn.addEventListener('click', () => {
            logInOverlay.style.display = 'none'; // Hide Log In overlay
        });
    }

    // Simulate a database with a simple object
    const database = {};

    // Sign Up Form Submission
    const signUpForm = document.getElementById('signUpForm');
    const signUpError = document.getElementById('signUpError');

    signUpForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const username = document.getElementById('signUser').value;
        const email = document.getElementById('signEmail').value;
        const password = document.getElementById('signPass').value;
        const confirmPassword = document.getElementById('signPassConf').value;

        // some absolute slop right here vvvvv
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/;

        if (password !== confirmPassword) {
            signUpError.textContent = 'Passwords must match.';
            document.getElementById('signPass').style.border = '2px solid red';
            document.getElementById('signPassConf').style.border = '2px solid red';
            return;
        }

        if (!passwordRegex.test(password)) {
            signUpError.textContent = 'Password must contain at least one number, one special character, and one uppercase letter.';
            document.getElementById('signPass').style.border = '2px solid red';
            return;
        }

        // Store in "database" (for now, it's a simple object)
        database[username] = { email, password };
        signUpOverlay.style.display = 'none'; // Close Sign Up Overlay
        alert('Sign up successful! You can now log in.');
    });

    // Log In Form Submission
    const logInForm = document.getElementById('logInForm');
    const logInError = document.getElementById('logInError');

    logInForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const username = document.getElementById('logInUsername').value;
        const password = document.getElementById('logInPassword').value;

        // Check credentials against "database"
        if (database[username] && database[username].password === password) {
            logInError.textContent = '';
            alert('Login successful!');
            window.location.replace("postauth/index.html");
        } else {
            logInError.textContent = 'Invalid username or password.';
        }
    });

    // initial pass field
    const toggleSignUpPassword = document.getElementById('toggleSignBtn');
    if (toggleSignUpPassword) {
        toggleSignUpPassword.addEventListener('click', (event) => {
            const signUpPassField = document.querySelector('#signPass');
            if (signUpPassField.type == 'password') {
                signUpPassField.type = 'text';
            } else {
                signUpPassField.type = 'password';
            }
        });
    }
    
    // confirm pass field
    const confirmPassword = document.getElementById('confirmSignBtn');
    if (confirmPassword) {
        confirmPassword.addEventListener('click', (event) => {
            const confirmPasswordField = document.querySelector('#signPassConf');
            if (confirmPasswordField.type === 'password') {
                confirmPasswordField.type = 'text';
            } else {
                confirmPasswordField.type = 'password';
            }
        });
    }

    // login pass field
    const toggleLogInPassword = document.getElementById('loginToggle');
    if (toggleLogInPassword) {
        toggleLogInPassword.addEventListener('click', () => {
            const passwordField = document.querySelector('#logInPassword');
            if (passwordField.type === 'password') {
                passwordField.type = 'text';
            } else {
                passwordField.type = 'password';
            }
        });
    }
});

