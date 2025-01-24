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
                font-size: 30px;
                font-weight: bold;
                display: inline-block;
                padding-right: 5vw;
                margin-right: 15vw;
            }

            .navcontainer {
                max-width: 100%;
                margin: 0 auto;
                padding: 0 15px;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100%;
                overflow: visible;
            }

            .navbar {
                position: -webkit-sticky; /* Safari */
                position: sticky;
                top: 0;
                height: 12vh;
                max-height: 75px;
                z-index: 1000;
                width: 100%;
                background-color: rgb(37,99,235);
            }

            .nav-elements ul {
                display: flex;
                justify-content: space-between;
                list-style-type: none;
            }

            .nav-elements ul li:not(:last-child) {
                margin-right: 60px;
            }
            
            .nav-elements ul li {
                margin-right: 60px;
            }

            .nav-elements ul a {
                font-weight: 100;
                font-size: 20px;
                color: white;
                text-decoration: none;
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
                gap: 15px;
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
                color: rgb(37, 34, 34);
            }
        </style>
            <header>
                <div class="navbar">
                    <div class="navcontainer">
                        <h1 class="title">Financial Manager ISP</h1>
                        <div class="nav-elements">
                        <ul>
                            <li>
                                <a href="#" class="active">Home</a>
                            </li>
                            <li>
                                <a href="#">About Us</a>
                            </li>
                            <li>
                                <a href="#">FAQ</a>
                            </li>
                            <li>
                                <a href="#">Contact</a>
                            </li>
                        </ul>
                        </div>
                        <div class="auth-buttons">
                            <a href="#" class="filled-button">Sign Up</a>
                            <a href="#">Log In</a>
                        </div>
                    </div>
                </div>
            </header>
        `;
    }
}

customElements.define('custom-header', Header);