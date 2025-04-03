import React, { useState } from 'react';
import Navbar from '../../components/Navbar.jsx';
import '../../css/InteractiveContentCards.css';

const cardsData = [
    {
      id: 1,
      title: 'Yip Yip',
      imageUrl: 'https://via.placeholder.com/1200x400?text=Web+Dev+Banner',
    },
    {
      id: 2,
      title: 'Yap Yap',
      imageUrl: 'https://via.placeholder.com/1200x400?text=Design+Banner',
    },
    {
      id: 3,
      title: 'Yippity Yap',
      imageUrl: 'https://via.placeholder.com/1200x400?text=Tech+Banner',
    },
  ];
  
  const Information = () => {
    const [activeCard, setActiveCard] = useState(null);
  
    const openCard = (card) => {
      setActiveCard(card);
      document.body.style.overflow = 'hidden';
    };
  
    const closeCard = () => {
      setActiveCard(null);
      document.body.style.overflow = '';
    };
  
    return (
      <>
        <Navbar />
        <div className="grid-container">
          {cardsData.map((card) => (
            <div key={card.id} className="card" onClick={() => openCard(card)}>
              {card.title}
            </div>
          ))}
        </div>
  
        {/* Overlay */}
        <div
          className={`overlay ${activeCard ? 'active' : ''}`}
          onClick={closeCard}
        ></div>
  
        {/* Expanded Card Modal */}
        {activeCard && (
          <div
            className="card expanded"
            style={{
              position: 'fixed',
              top: '40px',
              left: '40px',
              width: 'calc(100% - 80px)',
              height: 'calc(100% - 80px)',
              zIndex: 1000,
            }}
          >
            <div className="expanded-content">
              <button
                className="close-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  closeCard();
                }}
              >
                ✕ Close
              </button>
              <div className="card-hero">
                <h1 className="card-title">{activeCard.title}</h1>
                <p className="card-subtitle">
                  Yippity Yappity Yappington {activeCard.title}
                </p>
                <img
                  src={activeCard.imageUrl}
                  alt={activeCard.title}
                  style={{
                    width: '100%',
                    borderRadius: '12px',
                    marginTop: '24px',
                  }}
                />
              </div>
  
              <div className="content-section">
                <h2>Yippity Yappity Yappington</h2>
                <div className="content-grid">
                  <div className="feature-card">
                    <h3>Yippity Yappity Yappington</h3>
                    <p>Yippity Yappity Yappington</p>
                  </div>
                  <div className="feature-card">
                    <h3>Yippity Yappity Yappington</h3>
                    <p>Yippity Yappity Yappington</p>
                  </div>
                  <div className="feature-card">
                    <h3>Yippity Yappity Yappington</h3>
                    <p>Yippity Yappity Yappington</p>
                  </div>
                </div>
              </div>
  
              <div className="content-section">
                <h2>Course Overview</h2>
                <p>
                  Yippity Yappity Yappington {activeCard.title} Yippity Yappity Yappington:
                </p>
                <ul>
                  <li>Yippity Yappity Yappington</li>
                  <li>Yippity Yappity Yappington</li>
                  <li>Yippity Yappity Yappington</li>
                  <li>Yippity Yappity Yappington</li>
                  <li>Yippity Yappity Yappington</li>
                </ul>
                <a href="#" className="cta-button">
                  Yippity Yappity Yappington
                </a>
              </div>
  
              <div className="content-section">
                <h2>Yippity Yappity Yappington</h2>
                <div className="content-grid">
                  <div className="feature-card">
                    <h3>Yippity Yappity Yappington</h3>
                    <p>Yippity Yappity Yappington</p>
                  </div>
                  <div className="feature-card">
                    <h3>Yippity Yappity Yappington</h3>
                    <p>Yippity Yappity Yappington</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  };
  
  export default Information;
  