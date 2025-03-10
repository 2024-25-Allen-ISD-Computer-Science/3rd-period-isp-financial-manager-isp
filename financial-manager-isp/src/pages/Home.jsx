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