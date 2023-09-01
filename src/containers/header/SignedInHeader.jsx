import React from 'react';
import laptop from '../../assets/laptop.png';
import './header.css';


const Header = () => {
  return (
    <div className='ml__header section__padding' id='home'>
      <div className='ml__header-content'>
        <h1 className='gradient__text'>
        Helping you learn and trade successfully with Machine Learning.</h1>
        <p>Welcome to FuturStox - the future of trading and investing. Learn and leverage the power of AI and Machine Larning in the finance world. </p>
        </div>
      <div className='ml__header-image'>
            <img src={laptop} alt='laptop' />
      </div>
    </div>
  )
}

export default Header
