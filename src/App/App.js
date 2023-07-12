import React from 'react';
import { BrandLogo, Nav, Algo, Pricing} from '../components';
import { Footer, Header, ML } from '../containers';
import './App.css';


const App = () => {
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

      <Pricing />
     
      < Footer />
    </div>
  )
}

export default App

 