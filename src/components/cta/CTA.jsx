import React from 'react'
import './cta.css'

const CTA = ({ isSubscribed }) => {  // isSubscribed is a prop that indicates whether the user is subscribed or not
  const handleClick = () => {
    if (isSubscribed) {
      // If the user is subscribed, redirect them to the Streamlit app
      window.location.href = "http://localhost:8501/";
    } else {
      // If the user is not subscribed, show an error message
      alert("You must be a subscribed customer to access this feature.");
    }
  }

  return (
    <div className='ml__cta'>
        <div className='ml__cta-content'>
            <p>Click here to forecast prices</p>
            <h3>Play with and train our models</h3>
        </div>
        <div className='ml__cta-button'>
           <button type='button' onClick={handleClick}>Linear Regression</button> 
        </div>
    </div>
  )
}

export default CTA
