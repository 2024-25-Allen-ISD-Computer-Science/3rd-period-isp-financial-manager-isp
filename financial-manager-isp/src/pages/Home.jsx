import React from 'react';
import { useRef, useEffect } from 'react';
import '../css/indexstyle.css';

// JavaScript for FAQ Section

document.querySelectorAll(".faq-question").forEach((question) => {
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


const Home = () => {
    const animate = useRef(null);

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
            <div id="splash-wrapper">
              <div id="splash">
                <div id="splashcontainer">
                  <h1><span className="outline">Learn how to</span><br /><span id="typewrite"></span></h1>
                  <p>We aim to make managing your finances easily understandable and accessible <br />by providing you with various tools designed to assist your fiscal needs.</p>
                </div>
              </div>
              <div id="splash-image">
                <img src="https://raw.githubusercontent.com/2024-25-Allen-ISD-Computer-Science/3rd-period-isp-financial-manager-isp/refs/heads/main/public/accessiblefiles/FPXqiSR%20-%20Imgur.gif" />
              </div>
            </div>
    
            <div className="buffer" />
    
            <div className="fill-partway imgdesc">
              <div className="spanholder">
                <h4>Welcome to the webpage for our Financial Managner ISP!</h4>
                <span className="yapping">
                  This website aims to make managing your finances easily understandable and accessible. This project is currently a work in progress and we will continue to add more features as it continues. This site will eventually be able to track basic financial history, show and manage your income and expenses, and provide financial advice and access to information to improve your financial literacy.<br /><br />
                  This website was designed by Maci Siratt, Thomas Roney, David Kwon, Joseph Baril, and Nathan Charles.
                </span>
              </div>
            </div>

            <div ref={animate}>
              <h2>Frequently Asked Questions</h2>
            </div>


   
              <div class="faq-container">
                  <div class="faq-item">
                      <button class="faq-question" data-index="0">
                          What is the purpose of this website?
                          <span class="faq-toggle">+</span>
                      </button>
                      <div class="faq-answer">
                          <p>This website aims to provide an easy-to-use platform for managing finances, especially tailored for younger audiences.</p>
                      </div>
                  </div>

                  <div class="faq-item">
                      <button class="faq-question" data-index="1">
                          How do I create an account?
                          <span class="faq-toggle">+</span>
                      </button>
                      <div class="faq-answer">
                          <p>Simply click the Sign Up button and follow the instructions to create a new account.</p>
                      </div>
                  </div>

                  <div class="faq-item">
                      <button class="faq-question" data-index="2">
                          Is my data secure?
                          <span class="faq-toggle">+</span>
                      </button>
                      <div class="faq-answer">
                          <p>Yes, we use industry-standard encryption to ensure your data is secure and private.</p>
                      </div>
                  </div>
              </div>




                          <div className="team-carousel-wrapper">
                <div className="team-carousel">
                    <div className="carousel-item">
                        <img src="https://via.placeholder.com/200" alt="David Kwon" />
                        <div className="carousel-info">
                            <h3>David Kwon</h3>
                            <p>Web Developer & Designer</p>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <img src="https://via.placeholder.com/200" alt="Maci Siratt" />
                        <div className="carousel-info">
                            <h3>Maci Siratt</h3>
                            <p>Project Manager</p>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <img src="https://via.placeholder.com/200" alt="Thomas Roney" />
                        <div className="carousel-info">
                            <h3>Thomas Roney</h3>
                            <p>Financial Specialist</p>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <img src="https://via.placeholder.com/200" alt="Joseph Baril" />
                        <div className="carousel-info">
                            <h3>Joseph Baril</h3>
                            <p>Content Creator</p>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <img src="https://via.placeholder.com/200" alt="Nathan Charles" />
                        <div className="carousel-info">
                            <h3>Nathan Charles</h3>
                            <p>Financial Analyst</p>
                        </div>
                    </div>
                </div>
            </div>




             
            <div className="fill-partway imgdesc">
              
              
            </div>
          </main>
        </>
    )
  };
  
  
  export default Home;