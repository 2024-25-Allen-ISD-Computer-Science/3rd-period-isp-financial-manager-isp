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
                }, 500);
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
                signUpButton.textContent = "Sign Up";
                setTimeout(() => {
                    signUpForm.style.display = 'none';
                }, 500);
            } else {
                signUpForm.style.display = 'block';
                setTimeout(() => {
                    signUpForm.classList.add('show');
                }, 0);
                signUpButton.textContent = "Hide Form";
            }
        });

        function openNav() {
            document.getElementById("navbar1").style.width = "250px";
            document.getElementById("mainContent").style.marginLeft = "250px";
        }
        
        function closeNav() {
            document.getElementById("navbar1").style.width = "0";
            document.getElementById("mainContent").style.marginLeft = "0";
        }