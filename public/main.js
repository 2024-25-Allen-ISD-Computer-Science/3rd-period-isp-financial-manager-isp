//log in and submission forms
const logInButton = document.querySelector('.logInButton');
const logInForm = document.getElementById('logIn');
const signUpButton = document.querySelector('.signUpButton');
const signUpForm = document.getElementById('signUp');

logInButton.addEventListener('click', function() {
    if(logInForm.classList.contains('show')) {
        logInForm.classList.remove('show');
        logInButton.textContent = "Log In";
        setTimeout(() => {
            logInForm.style.display = 'none';
        }, 500 );
    } else {
        logInForm.style.display = 'block';
        setTimeout(() => {
            logInForm.classList.add('show');
        }, 0);
        logInButton.textContent = "Hide Form";
    }
});

signUpButton.addEventListener('click', function() {
    if (signUpForm.classList.contains('show')) {
        signUpForm.classList.remove('show');
        signUpButton.textContent = "Sign Up"; // Change button text
        // Use setTimeout to allow CSS transition to finish before setting display to none
        setTimeout(() => {
            signUpForm.style.display = 'none';
        }, 500); // Match this duration to the CSS transition time
    } else {
        signUpForm.style.display = 'block'; // Ensure the form is displayed
        setTimeout(() => {
            signUpForm.classList.add('show'); // Add class to fade in
        }, 0);
        signUpButton.textContent = "Hide Form"; // Change button text
    }
});

//navbar
function openNav() {
    document.getElementById("navbar1").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
  }
  
  function closeNav() {
    document.getElementById("navbar1").style.width = "0";
    document.getElementById("main").style.marginLeft= "0";
  }