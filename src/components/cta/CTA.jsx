import React from 'react';
import './cta.css';

const CTA = ({ isSubscribed }) => {  // isSubscribed is a prop that indicates whether the user is subscribed or not
  // const handleLSTMClick = () => {
  //   if (isSubscribed) {
  //     // If the user is subscribed, redirect them to the Streamlit app
  //     window.open("https://lstm-streamlit.onrender.com", '_blank');
  //       } else {
  //     // If the user is not subscribed, show an error message
  //     alert("You must be a subscribed customer to access this feature.");
  //   }
  // }

  const handleLSTMClick = () => {
        // Redirect the user to the Streamlit app without checking the subscription status
      window.open("https://streamlit-lstm-app-kkl5inde2q-uc.a.run.app", '_blank');
    
  }



    const handleLRClick = () => {
    // Redirect the user to the Streamlit app without checking the subscription status
    window.open("https://streamlit-linear-app-kkl5inde2q-ew.a.run.app", '_blank');
    }

  const handleTradeClick = () => {
    // Redirect the user to the Streamlit app without checking the subscription status
    window.open("https://freetrade.io", '_blank');  
  }
  

  return (
    <div className='ml__cta'>
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
  )
}

export default CTA
