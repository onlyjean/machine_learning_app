import React from 'react'
import { Features } from '../../components'
import './ml.css'


const ML = () => {
  return (
    <div className='ml__whatML section__margin' id='about'>
      <div className='ml__whatML-feature'>
        <Features />
      </div>
      <div className='ml__whatML-heading'>
        <h1 className='gradient__text'>Predicting Profits, Powering Portfolios: Your Future in Finance with Machine Learning</h1>
        <p>Trade with more confidence</p>
      </div>
      <div className='ml__whatML-container'>
      <Features />
      <Features />
      <Features />
      </div>
      
    </div>
  )
}

export default ML
