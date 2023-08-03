import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { Auth } from 'aws-amplify';
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import { Algo, BrandLogo, CTA, Nav, Pricing, SignIn, SignedInNav,PaymentSuccess } from '../components';
import { Footer, Header, ML, SignedInHeader } from '../containers';
import './App.css';





const HomePage = () => {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    checkAuthState();
  }, []);

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
        {/* < SignedInNav /> */}
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


const SignedInUser = () => {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);


  useEffect(() => {
    checkAuthState();
    checkSubscriptionStatus();
  }, []);

  const checkAuthState = async () => {
    try {
      await Auth.currentAuthenticatedUser();
      setIsAuthenticated(true);
    } catch (e) {
      setIsAuthenticated(false);
    }
  };


  const checkSubscriptionStatus = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      const response = await fetch('https://b6ucsfgkjd.execute-api.eu-west-2.amazonaws.com/dev/check-subscriptions');      
      const data = await response.json();
      console.log('Subscription data:', data);  // Log the data
      const currentUserStatus = data.find(status => status.email === user.attributes.email);
      console.log('Current user status:', currentUserStatus);  // Log the user's status
      setIsSubscribed(currentUserStatus?.isSubscribed || false);
    } catch (e) {
      console.error("Failed to check subscription status", e);
    }
  };
  



  return (
    
    
    <div className='App'>
      
      <div className='gradient__background'>
        < SignedInNav />
        <CTA isSubscribed={isSubscribed} />
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

      const App = () => {

  //       const [isAuthenticated, setIsAuthenticated] = useState(false);

  // useEffect(() => {
  //   checkAuthState();
  // }, []);

  // const checkAuthState = async () => {
  //   try {
  //     await Auth.currentAuthenticatedUser();
  //     setIsAuthenticated(true);
  //   } catch (e) {
  //     setIsAuthenticated(false);
  //   }
  // };
  return (
    
    <div>

     <Routes>
          {/* <Route path="/home" element={<HomePage/>} /> */}
          <Route path='/' element={<HomePage/>} />
          {/* <Route path="/authenticaed" element={isAuthenticated ? <SignedInUser/> : <SignedInNav/>} /> */}
          <Route path='/signin' element={<SignIn />} />
          <Route path='/signup' element={<SignIn />} /> 
          <Route path='/signedIn' element={<SignedInUser />} /> 
          <Route path="/success" element={<PaymentSuccess />} />


      </Routes>  

       </div> 


  )
}

export default App

 