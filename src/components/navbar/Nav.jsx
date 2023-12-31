import React, {useState} from 'react';
import './nav.css';
import logo from '../../assets/futurstox-high-resolution-logo-white-on-transparent-background 1.svg';
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri'
import { Link, useNavigate } from 'react-router-dom';

// Menu component for navigation links
const Menu = () => (
  <>
  <p><a href='#home'>Home</a></p>
  <p><a href='#about'>About Us</a></p>
  <p><a href='#algo'>Machine Learning</a></p>
  <p><a href='#pricing'>Pricing</a></p>
  </>

  
)

//Main Navigation function
const Nav = () => {
  const [toggleMenu, setToggleMenu] = useState(false);

  //useNavigate hook for navigation
  const navigate = useNavigate();

  // Function to navigate to Sign Up page
  const navigateToSignUp = () => {
    navigate('/signup');
  };

  // Function to navigate to Sign In page
  const navigateToSignIn = () => {
    navigate('/signin');
  };



  return (

    <div className='ml__nav'>
      <div className='ml__nav-links'>
        <div className='ml__nav-link_logo'>
          <img src={logo} alt='logo' />
        </div>
        <div className='ml__nav-links_container'>
          <Menu />
        </div>
      </div>
      <div className='ml__nav-sign'>
      <p onClick={navigateToSignIn}> Sign in</p>
      <button type="button" onClick={navigateToSignUp}>Sign up</button>
      </div>
      
      <div className='ml__nav-menu'>
      {toggleMenu
        ? <RiCloseLine color='#fff' size={27} onClick= {() => setToggleMenu(false)}/>
        : <RiMenu3Line color='#fff' size={27} onClick= {() => setToggleMenu(true)}/>}

      {toggleMenu && (
                <div className='ml__nav-menu_container scale-up-center'>
                  <div className='ml__nav-menu_container-links'>
                  <Menu />
                </div>
                <div className='ml__nav-menu_container-links-sign'>
                  <p onClick={navigateToSignIn}> Sign in</p>
                  <button type="button" onClick={navigateToSignUp}>Sign up</button>
                </div>
              </div>
              )}
      </div>
    </div>
    
  )
}

export default Nav
