//hi guys hii !!! nathan here heres how this thing sorta kinda works

class Header extends HTMLElement { // <------ this establishes a class called "Header" that inherits all the funny trinkets and baubles of the "HTMLElement" class (basically just steals its features)
    constructor() { 
        super(); // constructor function that basically just goes up to the HTMLElement class and steals its lunch money
    }

    connectedCallback() { //ok this is the meat of the component basicaly everything in here will show up as part of it when its rendered on the website
        const link = document.createElement('link'); // <----- create seperate element for the CSS so its not invading this file and making it hard to read
        link.rel = 'stylesheet';
        link.href = 'components/headerStyle.css';

        this.innerHTML = '';

        this.appendChild(link); //and then attach the css text

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
        `; // ^^^^^ all of this is just plain html not too hard to read i dont think however you will need to go check the CSS to figure out how the device scaling/burger menu stuff works
        //hint it has to do with the @media(max-width) tags

        const hamburger = this.querySelector('#hamburger'); //queryselector essentially just finds whatever has the same tag as it in the HTML
        const navElements = this.querySelector('#nav-elements');

        if (hamburger && navElements) { //check if hamburger and navelements have actually been rendered and exist on the page or else your logic will poo its pants
            hamburger.addEventListener('click', () => { //basic on element clicked listener event
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
                    `; // this pops in a little chunk of css to the hamburger to make it bold and stuff and updates it to show an X button instead of the ☰
                }
                console.log(navElements.classList); //ignore this this was just for debugging
            });
        } else {
            console.error('IF YOU ARE SEEING THIS EVERYTHING HAS GONE TERRIBLY WRONG........'); // im sure you can figure out what this means
        }
    }
}

customElements.define('custom-header', Header); // <----- push out the component so you can use it on pages with the <custom-header></custom-header> tags
//make sure when youre doing this you set the name of your custom element to something different BTW or else it will clash with this one and you will have diarrhea forever