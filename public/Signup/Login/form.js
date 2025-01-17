// Load the users database from localStorage, if available
let usersDatabase = JSON.parse(localStorage.getItem('usersDatabase')) || {};

// Function to save the updated users database to localStorage
function saveUsersDatabase() {
  localStorage.setItem('usersDatabase', JSON.stringify(usersDatabase));
}

// Function to validate the signup form
function signup() {
  // Reset errors and success message
  document.getElementById("usernameError").innerHTML = '';
  document.getElementById("emailError").innerHTML = '';
  document.getElementById("passwordError").innerHTML = '';
  document.getElementById("confirmPasswordError").innerHTML = '';
  document.getElementById("signupSuccess").innerHTML = '';

  let username = document.getElementById("username").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let confirmPassword = document.getElementById("confirmPassword").value;

  let usernameError = validateUsername(username);
  let emailError = validateEmail(email);
  let passwordError = validatePassword(password);
  let confirmPasswordError = validateConfirmPassword(password, confirmPassword);

  // If any validation error exists, stop the signup process
  if (usernameError || emailError || passwordError || confirmPasswordError) {
    document.getElementById("usernameError").innerHTML = usernameError;
    document.getElementById("emailError").innerHTML = emailError;
    document.getElementById("passwordError").innerHTML = passwordError;
    document.getElementById("confirmPasswordError").innerHTML = confirmPasswordError;
    return;
  }

  // If all validations pass, simulate saving to the "database"
  usersDatabase[username] = { email, password };
  saveUsersDatabase();  // Save updated database to localStorage
  document.getElementById("signupSuccess").innerHTML = "Sign up successful! Redirecting to login page...";

  // Redirect to login page after a short delay
  setTimeout(() => {
    document.getElementById("signupForm").style.display = "none";
    document.getElementById("loginForm").style.display = "block";
  }, 2000);
}

// Function to validate username (must not already exist)
function validateUsername(username) {
  if (!username) return "Username is required.";
  if (usersDatabase[username]) return "Username already exists.";
  return "";
}

// Function to validate email format
function validateEmail(email) {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!email) return "Email is required.";
  if (!emailPattern.test(email)) return "Please enter a valid email.";
  return "";
}

// Function to validate password (min 8 chars, contains number and special char)
function validatePassword(password) {
  if (!password) return "Password is required.";
  if (password.length < 8) return "Password must be at least 8 characters.";
  if (!/\d/.test(password)) return "Password must contain at least one number.";
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) return "Password must contain at least one special character.";
  return "";
}

// Function to validate confirm password
function validateConfirmPassword(password, confirmPassword) {
  if (confirmPassword !== password) return "Passwords do not match.";
  return "";
}

// Function to handle login
function login() {
  let loginUsername = document.getElementById("loginUsername").value;
  let loginPassword = document.getElementById("loginPassword").value;
  
  document.getElementById("loginError").innerHTML = '';
  document.getElementById("loginSuccess").innerHTML = '';

  // Check if the user exists in the "database"
  if (usersDatabase[loginUsername] && usersDatabase[loginUsername].password === loginPassword) {
    document.getElementById("loginSuccess").innerHTML = "Login successful.";
  } else {
    document.getElementById("loginError").innerHTML = "Invalid username or password.";
  }
}
