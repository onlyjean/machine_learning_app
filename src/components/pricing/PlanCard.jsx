import { loadStripe } from '@stripe/stripe-js';
import { API } from 'aws-amplify';
import React, { useState } from 'react';
import './plancard.css';

export default function PlanCard({
  isAuthenticated,
  name,
  description,
  price,
  features = [], // default value for features
  color,
  buttonText = 'Start Trial',
  
}) {

  const [showAlert, setShowAlert] = useState(false);
  const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
  console.log(process.env.REACT_APP_STRIPE_PUBLIC_KEY)

  const handleButtonClick = async () => {
    if (isAuthenticated) {
      const session = await API.post('StripeAPI','/create-checkout-session', {
        method: 'POST',
      });
      const stripe = await stripePromise;
      console.log('Session data from server:', session);
      console.log('Attempting to redirect to checkout with session ID:', session.id);
      const { error } = await stripe.redirectToCheckout({ sessionId: session.id });
      if (error) {
        console.error('Error:', error);
      }
    } else {
      // If the user is not authenticated, show a message
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 10000); // auto-hide after 10 seconds
    }
  };
  


  
  return (
    <div className="plan-card" style={{ backgroundColor: color }}>
      {showAlert && <div className='alert'>Please register first<button className='alert-close' onClick={() => setShowAlert(false)}>Close</button>
      </div>}
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
