import React from 'react';
import './App.css';
import { Brand, Nav, Header } from './components';
import { Footer } from './containers';


const App = () => {
  return (
    <div className='App'>
      <div className='gradient__background'>
        < Nav />
        < Header />
      </div>
      < Brand />
      < Footer />
    </div>
  )
}

export default App

 