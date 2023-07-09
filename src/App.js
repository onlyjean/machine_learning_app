import React from 'react';
import './App.css';
import { BrandLogo, Features, Nav} from './components';
import { Footer, Header, ML } from './containers';


const App = () => {
  return (
    <div className='App'>
      <div className='gradient__background'>
        < Nav />
        < Header />
      </div>
      < BrandLogo />
      < ML />
      <Features />
      < Footer />
    </div>
  )
}

export default App

 