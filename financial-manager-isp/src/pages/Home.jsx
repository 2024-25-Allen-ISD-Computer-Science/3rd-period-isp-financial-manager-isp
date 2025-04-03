import React, { useRef, useEffect } from 'react';
import '../css/indexstyle.css';

const Home = () => {
  const animate = useRef(null);


  document.querySelectorAll('.scroll-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('data-target');
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
            window.scrollTo({
                top: targetSection.offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

  // FAQ Toggle Logic inside useEffect
  useEffect(() => {
    const faqQuestions = document.querySelectorAll(".faq-question");

    // Adding event listeners to FAQ buttons
    faqQuestions.forEach((question) => {
      question.addEventListener("click", () => {
        const answer = question.nextElementSibling;
        const isOpen = answer.style.maxHeight;
        const toggleSymbol = question.querySelector(".faq-toggle");

        // Close all other open answers
        document.querySelectorAll(".faq-answer").forEach((otherAnswer) => {
          if (otherAnswer !== answer) {
            otherAnswer.style.maxHeight = null;
            otherAnswer.previousElementSibling.querySelector(".faq-toggle").textContent = "+";
          }
        });

        // Toggle the clicked answer
        if (isOpen) {
          answer.style.maxHeight = null;
          toggleSymbol.textContent = "+";
        } else {
          answer.style.maxHeight = answer.scrollHeight + "px";
          toggleSymbol.textContent = "–";
        }
      });
    });

    // Cleanup event listeners on component unmount
    return () => {
      faqQuestions.forEach((question) => {
        question.removeEventListener("click", () => {});
      });
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('hero-animation');
          }
        });
      },
      {
        threshold: 0.5,
      }
    );

    if (animate.current) {
      observer.observe(animate.current);
    }

    return () => {
      if (animate.current) {
        observer.unobserve(animate.current);
      }
    };
  }, []);

  return (
    <>
      <main>
      <section id="HOME">
        <div id="splash-wrapper">
          <div id="splash">
            <div id="splashcontainer">
              <h1><span className="outline">Learn how to</span><br /><span id="typewrite"></span></h1>
              <p>We aim to make managing your finances easily understandable and accessible <br />by providing you with various tools designed to assist your fiscal needs.</p>
            </div>
          </div>
          <div id="splash-image">
            <img height="400" width="800" src="https://raw.githubusercontent.com/2024-25-Allen-ISD-Computer-Science/3rd-period-isp-financial-manager-isp/860e00501860032b2c363b6a567f8c6e3fe7d85f/financial-manager-isp/public/FPXqiSR%20-%20Imgur.gif" />
          </div>
        </div>

        <div className="buffer" />

        <div className="fill-partway imgdesc">
          <div className="spanholder">
            <h4>Welcome to the webpage for our Financial Manager ISP!</h4>
            <span className="yapping">
              This website aims to make managing your finances easily understandable and accessible. This project is currently a work in progress and we will continue to add more features as it continues. This site will eventually be able to track basic financial history, show and manage your income and expenses, and provide financial advice and access to information to improve your financial literacy.<br /><br />
              This website was designed by Joseph Baril, Nathan Charles, David Kwon, Thomas Roney, and Maci Siratt.
            </span>
          </div>
        </div>
        </section>

        <section id="FAQ">
        <div ref={animate}>
          <h2>Frequently Asked Questions</h2>
        </div>

        <div className="faq-container">
          <div className="faq-item">
            <button className="faq-question" data-index="0">
              What is the purpose of this website?
              <span className="faq-toggle">+</span>
            </button>
            <div className="faq-answer">
              <p>This website aims to provide an easy-to-use platform for managing finances, especially tailored for younger audiences.</p>
            </div>
          </div>

          <div className="faq-item">
            <button className="faq-question" data-index="1">
              How do I create an account?
              <span className="faq-toggle">+</span>
            </button>
            <div className="faq-answer">
              <p>Simply click the Sign Up button and follow the instructions to create a new account.</p>
            </div>
          </div>

          <div className="faq-item">
            <button className="faq-question" data-index="2">
              Is my data secure?
              <span className="faq-toggle">+</span>
            </button>
            <div className="faq-answer">
              <p>Yes, we use industry-standard encryption to ensure your data is secure and private.</p>
            </div>
          </div>

          <div className="faq-item">
            <button className="faq-question" data-index="8">
              What is the best way to save money with this website?
              <span className="faq-toggle">+</span>
            </button>
            <div className="faq-answer">
              <p>By tracking your spending, setting up a budget, and setting savings goals, you can find areas where you can reduce expenses and save more money over time.</p>
            </div>
          </div>

          <div className="faq-item">
            <button className="faq-question" data-index="9">
              Do I need any special software to use this website?
              <span className="faq-toggle">+</span>
            </button>
            <div className="faq-answer">
              <p>No, this website is fully web-based, meaning you can access it from any modern browser on your computer or mobile device.</p>
            </div>
          </div>

          <div className="faq-item">
            <button className="faq-question" data-index="3">
              How do I track my expenses?
              <span className="faq-toggle">+</span>
            </button>
            <div className="faq-answer">
              <p>You can easily add your expenses by going to the "Expenses" section of the website, where you'll find the option to input new transactions.</p>
            </div>
          </div>
        </div>

        <div ref={animate}>
          <h2>Meet The Team</h2>
        </div>

        <div ref={animate}>
          <h2>Meet The Team</h2>
        </div>

        </section>


        <section id="ABOUT">
        <div className="team-carousel-wrapper">
          <div className="team-carousel">
            <div className="carousel-item">
                <img src="https://via.placeholder.com/200" alt="Joseph Baril" />
                <div className="carousel-info">
                  <h3>Joseph Baril</h3>
                  <p>Backend Developer</p>
                </div>
              </div>
            <div className="carousel-item">
                <img src="https://via.placeholder.com/200" alt="Nathan Charles" />
                <div className="carousel-info">
                  <h3>Nathan Charles</h3>
                  <p>Full-Stack Developer</p>
                </div>
              </div>
            <div className="carousel-item">
              <img src="https://via.placeholder.com/200" alt="David Kwon" />
              <div className="carousel-info">
                <h3>David Kwon</h3>
                <p>Front-End Developer</p>
              </div>
            </div>
              <div className="carousel-item">
                <img src="https://via.placeholder.com/200" alt="Thomas Roney" />
                <div className="carousel-info">
                  <h3>Thomas Roney</h3>
                  <p>Project Manager</p>
                </div>
              </div>
            <div className="carousel-item">
              <img src="https://via.placeholder.com/200" alt="Maci Siratt" />
              <div className="carousel-info">
                <h3>Maci Siratt</h3>
                <p>Main Website Designer</p>
              </div>
            </div>
          </div>
        </div>
        </section>
        <div className="fill-partway imgdesc"></div>


        <section id="CONTACT"></section>
        <footer class="footer">
            <div class="footer-content">
                <p>@FinancialManager</p>
            </div>
        </footer>
      </main>
    </>
  );
};

export default Home;
