import React from 'react';
import laptop from '../../assets/laptop.png';
import people from '../../assets/people.png';
import './header.css';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  //useNavigate
  const navigate = useNavigate();

  const navigateToSignUp = () => {
    navigate('/signup');
  };



  return (
    <div className='ml__header section__padding' id='home'>
      <div className='ml__header-content'>
        <h1 className='gradient__text'>
        Helping you learn and trade successfully with Machine Learning.</h1>
        <p>Welcome to FuturStox - the future of trading and investing. Learn and leverage the power of AI and Machine Larning in the finance world. </p>
        <div className='ml__header-content__input'>
          <input type='email' placeholder='your email address' />
          <button type='button'  onClick={navigateToSignUp}>Get Started</button>
          </div>
          <div className='ml__header-content__people'>
            <img src={people} alt='people'/>
            <p>Sign up to use our free features and join the list of many users currently using FuturStox.</p>
          </div>
        </div>
      <div className='ml__header-image'>
            <img src={laptop} alt='laptop' />
      </div>
    </div>
  )
}

export default Header
