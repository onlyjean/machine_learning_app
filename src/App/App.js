import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { Auth } from 'aws-amplify';
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import { Algo, BrandLogo, CTA, Nav, Pricing, SignIn, SignedInNav,PaymentSuccess } from '../components';
import { Footer, Header, ML, SignedInHeader } from '../containers';
import './App.css';
import { User } from 'react-feather';




// Home Page Component
const HomePage = () => {

  // State variable to track authentication status
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Effect hook to check authentication 
  useEffect(() => {
    checkAuthState();
  }, []);

  // Function to check if user is authenticated
  const checkAuthState = async () => {
    try {
      await Auth.currentAuthenticatedUser();
      setIsAuthenticated(true);
    } catch (e) {
      setIsAuthenticated(false);
    }
  };



  return (
    <div className='App'>
      
      <div className='gradient__background'>
        < Nav />
        < Header />
      </div>

      <div className='brand-logo-background'>
      < BrandLogo />
      </div>

      <div className='machine-background'>
      < ML />
      </div>

      <div className='algo-background'>
        < Algo />
      </div>

      <Pricing isAuthenticated={isAuthenticated} />
  
      < Footer />
      </div>
      )
    }


// SignedInUser Component
const SignedInUser = () => {


  // State variables for authentication, subscription, and username
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [Username, setUsername] = useState(null);  


  // Effect hook to check authentication and subscription on component mount
  useEffect(() => {
    checkAuthState();
    checkSubscriptionStatus();
  }, []);

    // Function to check if user is authenticated
  const checkAuthState = async () => {
    try {
      await Auth.currentAuthenticatedUser();
      setIsAuthenticated(true);
    } catch (e) {
      setIsAuthenticated(false);
    }
  };

  // Function to check if user is subscribed
  const checkSubscriptionStatus = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      setUsername(user.username); 
      const response = await fetch('https://b6ucsfgkjd.execute-api.eu-west-2.amazonaws.com/dev/check-subscriptions');      
      const data = await response.json();
      const currentUserStatus = data.find(status => status.Username === user.attributes.Username);
      setIsSubscribed(currentUserStatus?.isSubscribed || false);
    } catch (e) {
      console.error("Failed to check subscription status", e);
    }
  };
  
  return (

    <div className='App'>
      <div className='gradient__background'>
        < SignedInNav />
        <CTA isSubscribed={isSubscribed} username={Username} />
        < SignedInHeader />
      </div>

      <div className='brand-logo-background'>
      < BrandLogo />
      </div>

      <div className='machine-background'>
      < ML />
      </div>

      <div className='algo-background'>
        < Algo />
      </div>

      <Pricing isAuthenticated={isAuthenticated} />
  
      < Footer />
      </div>
      )
    }



// Main App Component
const App = () => {

  return (
    
    <div>

     <Routes>
          <Route path='/' element={<HomePage/>} />
          <Route path='/signin' element={<SignIn />} />
          <Route path='/signup' element={<SignIn />} /> 
          <Route path='/signedIn' element={<SignedInUser />} /> 
          <Route path="/success" element={<PaymentSuccess />} />
      </Routes>  

       </div> 


  )
}

export default App

 