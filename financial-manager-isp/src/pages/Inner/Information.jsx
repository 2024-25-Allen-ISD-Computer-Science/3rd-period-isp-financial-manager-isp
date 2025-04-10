import React, { useState } from 'react';
import '../../css/InteractiveContentCards.css';

const cardsData = [
  {
    id: 1,
    title: 'Retirement Account',
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
                {activeCard.title === 'Retirement Account'
                  ? 'Learn about retirement accounts like Roth IRAs and 401(k)s.'
                  : `Yippity Yappity Yappington ${activeCard.title}`}
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
              {activeCard.title === 'Retirement Account' ? (
                <>
                  <h2>Understanding Retirement Accounts</h2>
                  <div className="content-grid">
                    <div className="feature-card">
                      <h3>What is a Roth IRA?</h3>
                      <p>
                        A Roth IRA is a retirement account where you contribute
                        after-tax income. Your money grows tax-free, and
                        withdrawals in retirement are also tax-free.
                      </p>
                    </div>
                    <div className="feature-card">
                      <h3>401(k) Plans</h3>
                      <p>
                        Employer-sponsored 401(k) plans allow pre-tax
                        contributions with potential employer matching. Taxes
                        are paid when you withdraw funds in retirement.
                      </p>
                    </div>
                    <div className="feature-card">
                      <h3>Traditional IRA</h3>
                      <p>
                        Contributions may be tax-deductible, but taxes are owed
                        on withdrawals. This is ideal if you expect to be in a
                        lower tax bracket in retirement.
                      </p>
                    </div>
                  </div>

                  <div className="content-section">
                    <h2>Tips for Getting Started</h2>
                    <ul>
                      <li>Start early to benefit from compounding interest.</li>
                      <li>Max out employer matches in your 401(k).</li>
                      <li>
                        Understand contribution limits and income thresholds.
                      </li>
                      <li>Diversify your investments.</li>
                    </ul>
                    <a
                      href="#"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cta-button"
                    >
                      Learn More
                    </a>
                  </div>
                </>
              ) : (
                <>
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

                  <div className="content-section">
                    <h2>Course Overview</h2>
                    <p>
                      Yippity Yappity Yappington {activeCard.title} Yippity
                      Yappity Yappington:
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
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Information;
