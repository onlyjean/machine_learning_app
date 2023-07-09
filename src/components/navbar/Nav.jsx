import React, {useState} from 'react';
import './nav.css';
import logo from '../../assets/futurstox-high-resolution-logo-white-on-transparent-background 1.svg';
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri'
// BEM --> Block Element Modifier (CSS naming convention)

const Menu = () => (
  <>
  <p><a href='#home'>Home</a></p>
  <p><a href='#futurStox'>About Us</a></p>
  <p><a href='#ml'>Machine Learning</a></p>
  <p><a href='#features'>Capabilities</a></p>
  <p><a href='#stock'>Stock Market</a></p>
  </>
)

const Nav = () => {
  const [toggleMenu, setToggleMenu] = useState(false);


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
        <p> Sign In</p>
        <button type='button'>Sign Up </button>
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
                  <p>Sign in</p>
                  <button type="button">Sign up</button>
                </div>
              </div>
              )}
      </div>
    </div>
  )
}

export default Nav
