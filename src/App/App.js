import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import { Algo, BrandLogo, Nav, Pricing, SignIn, SignedInNav } from '../components';
import { Footer, Header, ML } from '../containers';
import './App.css';
import { Auth } from 'aws-amplify';





const HomePage = () => {
  return (
    
    
    <div className='App'>
      
      <div className='gradient__background'>
        < Nav />
        < SignedInNav />
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

      <Pricing />
  
      < Footer />
      </div>
      )
    }


const SignedInUser = () => {
  return (
    
    
    <div className='App'>
      
      <div className='gradient__background'>
        < SignedInNav />
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

      <Pricing />
  
      < Footer />
      </div>
      )
    }

      const App = () => {

        const [isAuthenticated, setIsAuthenticated] = useState(false);

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
    
    <div>

     <Routes>
     <Route path="/" element={isAuthenticated ? <SignedInUser/> : <HomePage/>} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignIn />} /> 
        </Routes>  

       </div> 


  )
}

export default App

 