import React from 'react'
import './algo.css'
import Feature from '../feature/Feature'

const featuresData = [
  {
      title:'Univariate Regression',
      text: 'Univariate regression is fhfdjfhdshjfd sjsjdfj jj jjfj fhsdj fjfhjdh fhf j hfj jfjh hj'
  },

  {
      title:'Multiple Regression',
      text: 'Univariate regression is fhfdjfhdshjfd sjsjdfj jj jjfj fhsdj fjfhjdh fhf j hfj jfjh hj'
  },

  {
      title:'KNN',
      text: 'Univariate regression is fhfdjfhdshjfd sjsjdfj jj jjfj fhsdj fjfhjdh fhf j hfj jfjh hj'
  },

  {
      title:'LSTM',
      text: 'Univariate regression is fhfdjfhdshjfd sjsjdfj jj jjfj fhsdj fjfhjdh fhf j hfj jfjh hj'
  },

]

const Algo = () => {
return (
  <div className='ml__algorithms section__padding' id='algo'>
      <div className='ml__algorithms-heading'>
          <h1 className='gradient__text'>Explore the Engine: Unveiling the Advanced Machine Learning Algorithms Behind The Predictions</h1>
          <p>Sign up for more information.</p>
      </div>
      <div className='ml__algorithms-container'>
          {featuresData.map((item, index) => (
              <Feature title={item.title} text={item.text} key={item.title + index} />
          ))}

      </div>
  </div>
)
}

export default Algo
