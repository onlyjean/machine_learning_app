import React from 'react'
import Feature from '../feature/Feature'
import './algo.css'

const featuresData = [
  {
      title:'Univariate Regression',
      text: 'Univariate regression is a type of statistical analysis that predicts an outcome based on a single feature. In the context of our stock price prediction model, the only feature we use is the adjusted closing price. This means we\'re trying to predict future stock prices based solely on past closing prices.'
  },

  {
      title:'Multiple Regression',
      text: 'Multivariate regression, on the other hand, is a more complex model that considers multiple features or variables. Instead of just looking at the closing price, it might also take into account factors like moving average, exponential moving avergae, or stochastic oscillator. This can potentially provide a more accurate prediction, as it considers a wider range of influences on stock prices.'
  },

  {
      title:'LSTM',
      text: 'LSTM stands for Long Short-Term Memory. It\'s a type of recurrent neural network (RNN) that\'s particularly good at learning from sequences of data. In the case of stock prices, an LSTM can learn patterns over time, such as how prices tend to move up or down following certain events or at certain times of year.'
  },

]

const Algo = () => {
return (
  <div className='ml__algorithms section__padding' id='algo'>
      <div className='ml__algorithms-heading'>
          <h1 className='gradient__text'>Explore the Engine: Unveiling the Advanced Machine Learning Algorithms Behind The Predictions</h1>
          <p>Sign up for more information</p>
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
