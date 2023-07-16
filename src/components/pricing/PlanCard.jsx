import React from 'react';
import './plancard.css'

export default function PlanCard({
  isAuthenticated,
  name,
  description,
  price,
  features = [], // default value for features
  color,
  buttonText = 'Start Trial',
}) {

  const handleButtonClick = () => {
    if (isAuthenticated) {
      // If the user is authenticated, redirect to Stripe
      window.location.href = 'https://stripe.com'; // Replace this with your Stripe URL
    } else {
      // If the user is not authenticated, show a message
      alert('Please register first');
    }
  };

  
  return (
    <div className="plan-card" style={{ backgroundColor: color }}>
      <h2>{name}</h2>
      <div className="plan-price">
        {price ? (
          <>
            <div>£{price}</div>
            <div>/month</div>
          </>
        ) : (
          'Free'
        )}
      </div>
      <p>{description}</p>
      <ul className="plan-features">
        {features.map((feature) => (
          <li>
            <svg
              className="feature-icon"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            {feature}
          </li>
        ))}
      </ul>
      <button className="plan-button" onClick={handleButtonClick}>
        {buttonText}
      </button>
    </div>
  );
}
