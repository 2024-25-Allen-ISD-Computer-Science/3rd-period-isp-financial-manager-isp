//hi guys hii !!! nathan here heres how this thing sorta kinda works

class Header extends HTMLElement {
    constructor() { 
        super();
    }

    connectedCallback() {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'components/headerStyle.css';

        this.innerHTML = '';

        this.appendChild(link);

        this.innerHTML += `
        <header>
            <div class="navbar">
                <div class="navcontainer">
                    <h1 class="title">Financial Manager ISP</h1>
                    <div class="hamburger" id="hamburger">
                        ☰
                    </div>
                    <div class="nav-elements" id="nav-elements">
                        <ul>
                            <li><a href="#">Home</a></li>
                            <li><a href="#">About Us</a></li>
                            <li><a href="#">FAQ</a></li>
                            <li><a href="#">Contact</a></li>
                        </ul>
                        <div class="auth-buttons">
                            <a href="#" id="signUpBtn" class="filled-button">Sign Up</a>
                            <a href="#" id="logInBtn">Log In</a>
                        </div>
                    </div>
                </div>
            </div>
        </header>
        `;

        const hamburger = this.querySelector('#hamburger');
        const navElements = this.querySelector('#nav-elements');

        if (hamburger && navElements) {
            hamburger.addEventListener('click', () => {
                if (navElements.classList.contains('show')) {
                    navElements.classList.remove('show');
                    hamburger.innerHTML = '☰';
                } else {
                    navElements.classList.add('show');
                    hamburger.innerHTML = `
                    <style>
                        .hamburger {
                        font-weight: 800px;
                        font-family: sans-serif;
                        }
                    </style>
                    X
                    `;
                }
                console.log(navElements.classList);
            });
        } else {
            console.error('IF YOU ARE SEEING THIS EVERYTHING HAS GONE TERRIBLY WRONG........'); 
        }
    }
}

customElements.define('custom-header', Header);
//make sure when youre doing this you set the name of your custom element to something different BTW or else it will clash with this one and you will have diarrhea forever