import React, { useState, useEffect } from 'react';
import './cta.css';

// CTA function 
const CTA = ({ isSubscribed, username }) => {  // isSubscribed and username are props that indicates the current user's username and subscription status
  console.log("Is the user subscribed?", isSubscribed);  
  console.log("Current user:", username);  

  // State variables for user subscription status and alert visibility
  const [isUserSubscribed, setIsUserSubscribed] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  
  // useEffect hook to fetch subscription status when component mounts or updates
  useEffect(() => {

     // Asynchronous function to fetch subscription status from API
    const fetchSubscriptionStatus = async () => {
      try {
        const response = await fetch("https://b6ucsfgkjd.execute-api.eu-west-2.amazonaws.com/dev/check-subscriptions");
        const data = await response.json();
        console.log('Subscription data:', data); 
        console.log('Username to check:', username);  
    
        const currentUserStatus = data.find(status => status.email === username);  
    
        if (currentUserStatus) {
          setIsUserSubscribed(currentUserStatus.isSubscribed);
        } else {
          console.warn('Current user status not found');  
          setIsUserSubscribed(false);
        }
    
      } catch (error) {
        console.error('Failed to check subscription:', error);
      }
    };

    // Calling the fetch function
    fetchSubscriptionStatus();
  }, [username, isSubscribed]);


  const handleLSTMClick = () => {
    console.log("Current isSubscribed state:", isSubscribed);  
    
    if (isSubscribed) {
      // If the user is subscribed, redirect them to the Streamlit app
      window.open("https://lstm-streamlit.onrender.com", '_blank');
        } else {
      // If the user is not subscribed, alert them to subscribe
      setShowAlert(true); 
      setTimeout(() => setShowAlert(false), 10000);
    }
  }


    const handleLRClick = () => {
    // Redirect the user to the Streamlit app without checking the subscription status
    window.open("https://streamlit-linear-app-kkl5inde2q-ew.a.run.app", '_blank');
    }

  const handleTradeClick = () => {
    // Redirect the user to the Freetrade third party app without checking the subscription status
    window.open("https://freetrade.io", '_blank');  
  }
  

  
  return (
    <div className='ml__cta'>
      {showAlert && <div className='alert'>You must subscibe to access this feature. <button className='alert-close' onClick={() => setShowAlert(false)}>Close</button></div>}
      <div className='ml__cta-content'>
        <p>Click here to forecast prices</p>
        <h3>Play with and train our models</h3>
      </div>
      <div className='ml__cta-button'>
        <button type='button' onClick={handleLSTMClick}>LSTM</button>
        <button type='button' onClick={handleLRClick}>Linear Regression</button>
        <button type='button' onClick={handleTradeClick}>Click to Trade</button>
      </div>
    </div>
  );
};


export default CTA
