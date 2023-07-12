import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import React from 'react';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import { Algo, BrandLogo, Nav, Pricing, SignIn } from '../components';
import { Footer, Header, ML } from '../containers';
import './App.css';




const App = () => {
  return (

//     <Authenticator>

// {({ signOut, user }) => (
    
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

      <Pricing />
     ß
      < Footer />
      {/* <button onClick={signOut}>Sign out</button> */}
    
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignIn />} /> 
        </Routes>
     
    </div>



// )}
//     </Authenticator>
  )
}

export default App

 