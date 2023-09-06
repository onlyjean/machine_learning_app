import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './paymentsuccess.css';
import { CheckCircle } from 'react-feather'; // You need to install react-feather for this


// Main PaymentSuccess function
const PaymentSuccess = () => {
  const navigate = useNavigate();
  // Extracting session_id from the URL query parameters
  const location = useLocation();
  // Extracting session_id from the URL query parameters
  const sessionId = new URLSearchParams(location.search).get('session_id');

  return (
    <div className='payment-success-background section__padding'>
      <div className="payment-success-container">
        <CheckCircle color="green" size={100} />
        <h1>Payment Successful</h1>
        <p>Your session ID is: {sessionId}</p>
        <button className="signin-button" onClick={() => navigate('/signedIn')}>Home</button>
      </div>
    </div>
  );
}

export default PaymentSuccess;
