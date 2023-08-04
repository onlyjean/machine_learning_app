import React from 'react';
import './footer.css'

import logo from '../../assets/futurstox-high-resolution-logo-white-on-transparent-background 1.svg';


const Footer = () => {
  return (
    <div className='ml__footer section__padding'>
      <div className='ml__footer-heading'>

        <h1 className='gradient__text'>Learn and explore the capabilities of ML in the financial world</h1>
      </div>
      <div className='ml__footer-button'>
        <p>Join Us</p>
      </div>


      <div className='ml__footer-links'>
        <div className='ml__footer-links_logo'>
          <img src={logo} alt='logo' />
        </div>
        <div className='ml__footer-links_div'>
          <h4>Links</h4>
          <p>Social Media</p>
          <p>Contact</p>
        </div>
        <div className='ml__footer-links_div'>
          <h4>Company</h4>
          <p>Terms & Condition</p>
          <p>Privacy Policy</p>
          <p>Careers</p>
          <p>Contact</p>
        </div>
        <div className='ml__footer-links_div'>
          <h4>Get In Touch</h4>
          <p>LinkecIn</p>
          <p>Birmingham</p>
          <p>0121 6989 234</p>
          <p>Contact</p>
        </div>
      </div>
      <div className='ml__footer-copyright'>
        <p>© 2023 FuturStox. All rights reserved.</p>
      </div>
    </div>
  )
}

export default Footer
