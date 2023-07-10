import React from 'react';
import { BrandLogo, Features, Nav } from '../components';
import { Footer, Header, ML } from '../containers';
import './App.css';


const App = () => {
  return (
    <div className='App'>
      <div className='gradient__background'>
        < Nav />
        < Header />
      </div>
      < BrandLogo />
      <div className='machine-color'>
      < ML />

      </div>
     
      < Footer />
    </div>
  )
}

export default App

 