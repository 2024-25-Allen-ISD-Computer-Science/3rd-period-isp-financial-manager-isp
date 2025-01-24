class Header extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
        <style>
            * {
                box-sizing: border-box;
            }

            .title {
                color: white;
                margin: 0;
                font-size: 24px;
                font-weight: bold;
                display: inline-block;
                padding-right: 5vw;
                margin-right: 15vw;
                margin-left: 5vw;
                white-space: nowrap;
            }

            .navcontainer {
                max-width: 100%;
                margin: 0 auto;
                padding: 0 15px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                height: 100%;
                flex-wrap: nowrap;
                overflow: hidden;
            }

            .navbar {
                position: fixed;
                top: 0;
                height: 12vh;
                max-height: 75px;
                z-index: 1000;
                width: 100%;
                background-color: rgb(37, 99, 235);
            }

            .nav-elements {
                display: flex;
                align-items: center;
            }

            .nav-elements ul {
                display: flex;
                list-style-type: none;
                padding: 0;
                margin: 0;
                gap: 4vw;
            }

            .nav-elements ul li {
                white-space: nowrap;
            }

            .nav-elements ul a {
                font-weight: 100;
                font-size: 20px;
                color: white;
                text-decoration: none;
                white-space: nowrap;
                overflow: hidden;
            }

            .nav-elements ul a.active {
                color: rgb(255, 255, 255);
                position: relative;
            }

            .nav-elements ul a.active::after {
                content: '';
                position: absolute;
                bottom: -4px;
                left: 0;
                width: 100%;
                height: 2px;
                background-color: rgb(255, 255, 255);
            }

            .auth-buttons {
                display: flex;
                gap: 10px;
                margin-left: 2vw;
                margin-right: 2vw;
                white-space: nowrap;
            }

            .auth-buttons a {
                padding: 8px 16px;
                font-size: 14px;
                font-weight: 600;
                color: white;
                text-decoration: none;
                border: 2px solid white;
                border-radius: 20px;
                transition: all 0.3s ease-in-out;
            }

            .auth-buttons a.filled-button {
                background-color: white;
                color: rgb(37, 99, 235); /* Matches navbar color */
                border: 2px solid white;
            }

            .auth-buttons a.filled-button:hover {
                background-color: rgb(37, 99, 235);
                color: white;
            }

            .auth-buttons a {
                color: white;
                border: 2px solid white;
            }

            .auth-buttons a:hover {
                background-color: white;
                color: rgb(37,99,235);
            }

            .hamburger {
                display: none;
                flex-direction: column;
                gap: 5px;
                cursor: pointer;
                color: white;
                font-size: 35px;
                visibility: hidden;
            }

            @media (max-width: 1024px) {
                .title {
                    font-size: 20px;
                    margin-right: 4vw;
                    margin-left: 1vw;
                }

                .nav-elements ul li {
                    margin-right: 1vmin;
                }

                .auth-buttons {
                    gap: 1vw;
                }
            }

            @media (max-width: 880px) {
                .nav-elements {
                    display: flex;
                    position: fixed;
                    top: 10.9vh;
                    height: 100%;
                    width: 25%;
                    background-color: rgb(37, 99, 235);
                    flex-direction: column;
                    align-items: flex-start;
                    padding: 20px;
                    gap: 20px;
                    transition: right 0.3s ease-in-out;
                    z-index: 0;
                }

                .nav-elements:not(.show) {
                    right: -100%;
                }

                .nav-elements.show {
                    right: 0%;
                }

                .nav-elements ul {
                    flex-direction: column;
                    width: 100%;
                    gap: 10px;
                }

                .auth-buttons {
                    flex-direction: column;
                    align-items: flex-start;
                    gap: 10px;
                    width: 100%;
                    margin: 0;
                }

                .hamburger {
                    display: flex;
                    visibility: visible;
                }
            }
        </style>
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