import { Auth } from 'aws-amplify';
import React, { useState } from 'react';
import { RiCloseLine, RiMenu3Line } from 'react-icons/ri';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/futurstox-high-resolution-logo-white-on-transparent-background 1.svg';
import './nav.css';


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
const SignedInNav = () => {

  //useNavigate hook for navigation
  const navigate = useNavigate();
  // State for toggle menu
  const [toggleMenu, setToggleMenu] = useState(false);

  // Function to handle sign out
  const handleSignOut = async () => {
    try {
      await Auth.signOut();
      navigate('/');
    } catch (error) {
      console.log('error signing out:', error);
    }
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
      <button type="button" onClick={handleSignOut}>Sign Out</button>
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
                  <button type="button" onClick={handleSignOut}>Sign Out</button>
                </div>
              </div>
              )}
      </div>
    </div>
    
  )
}

export default SignedInNav
