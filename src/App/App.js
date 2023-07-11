import React from 'react';
import { BrandLogo, Nav, Algo } from '../components';
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
      <div className='machine-background'>
      < ML />
      </div>
      <div className='algo-background'>
        < Algo />

      </div>
     
      < Footer />
    </div>
  )
}

export default App

 