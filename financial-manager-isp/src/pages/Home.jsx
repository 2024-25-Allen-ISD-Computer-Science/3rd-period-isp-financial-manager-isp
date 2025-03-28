import React from 'react';
import { useRef, useEffect } from 'react';
import '../css/indexstyle.css';


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
                      
                        <!-- Team Carousel HTML -->
            <section class="team-display">
              <h2>Meet Our Financial Experts</h2>
              <div class="team-carousel">
                <!-- Card 1 -->
                <div class="team-card">
                  <div class="card-top">
                    <h3>Maci Siratt</h3>
                    <p>Lead Developer</p>
                  </div>
                  <div class="card-content">
                    <p>Specializes in frontend architecture and user experience design for financial applications.</p>
                  </div>
                </div>
                
                <!-- Card 2 -->
                <div class="team-card">
                  <div class="card-top" style="background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);">
                    <h3>Thomas Roney</h3>
                    <p>Backend Engineer</p>
                  </div>
                  <div class="card-content">
                    <p>Develops secure transaction systems and data analytics pipelines for financial data.</p>
                  </div>
                </div>
                
                <!-- Card 3 -->
                <div class="team-card">
                  <div class="card-top" style="background: linear-gradient(135deg, #059669 0%, #047857 100%);">
                    <h3>David Kwon</h3>
                    <p>Financial Analyst</p>
                  </div>
                  <div class="card-content">
                    <p>Provides insights on market trends and develops investment algorithms.</p>
                  </div>
                </div>
                
                <!-- Card 4 -->
                <div class="team-card">
                  <div class="card-top" style="background: linear-gradient(135deg, #d946ef 0%, #a855f7 100%);">
                    <h3>Joseph Baril</h3>
                    <p>UI/UX Designer</p>
                  </div>
                  <div class="card-content">
                    <p>Creates intuitive interfaces for complex financial data visualization.</p>
                  </div>
                </div>
                
                <!-- Card 5 -->
                <div class="team-card">
                  <div class="card-top" style="background: linear-gradient(135deg, #ea580c 0%, #c2410c 100%);">
                    <h3>Nathan Charles</h3>
                    <p>Data Scientist</p>
                  </div>
                  <div class="card-content">
                    <p>Builds predictive models for personal finance optimization.</p>
                  </div>
                </div>
              </div>
            </section>






            <div className="fill-partway imgdesc">
              <div className="spanholder">
                <span className="yapping">
                  Filler text about the team and how hard they work or whatever
                </span>
              </div>
              <div className="spanholder">
                there is supposed to be a card carousel here but i dont think joe or david figured it out
              </div>
            </div>
          </main>
        </>
    )
  };
  
  
  export default Home;