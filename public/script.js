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
        });

        logInBtn.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default anchor behavior
            logInOverlay.style.display = 'flex'; // Show Log In overlay
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

        const username = document.getElementById('signUpUsername').value;
        const email = document.getElementById('signUpEmail').value;
        const password = document.getElementById('signUpPassword').value;
        const confirmPassword = document.getElementById('signUpConfirmPassword').value;

        // Basic validation for password complexity
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/;

        if (password !== confirmPassword) {
            signUpError.textContent = 'Passwords do not match!';
            return;
        }

        if (!passwordRegex.test(password)) {
            signUpError.textContent = 'Password must contain at least one number, one special character, and one uppercase letter.';
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
            logInOverlay.style.display = 'none'; // Close Log In Overlay
        } else {
            logInError.textContent = 'Invalid username or password.';
        }
    });

    // Password visibility toggle for Sign Up form
    const toggleSignUpPassword = document.getElementById('toggleSignUpPassword');
    if (toggleSignUpPassword) {
        toggleSignUpPassword.addEventListener('click', () => {
            const passwordField = document.getElementById('signUpPassword');
            const currentType = passwordField.type;
            passwordField.type = currentType === 'password' ? 'text' : 'password';
            toggleSignUpPassword.textContent = passwordField.type === 'password' ? 'Show' : 'Hide';
        });
    }

    // Password visibility toggle for Log In form
    const toggleLogInPassword = document.getElementById('toggleLogInPassword');
    if (toggleLogInPassword) {
        toggleLogInPassword.addEventListener('click', () => {
            const passwordField = document.getElementById('logInPassword');
            const currentType = passwordField.type;
            passwordField.type = currentType === 'password' ? 'text' : 'password';
            toggleLogInPassword.textContent = passwordField.type === 'password' ? 'Show' : 'Hide';
        });
    }
});
