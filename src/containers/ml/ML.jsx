import React from 'react'
import { Features } from '../../components'
import './ml.css'


const ML = () => {
  return (
    <div className='ml__whatML section__margin' id='about'>
      <div className='ml__whatML-feature'>
        <Features title= 'About FuturStox' text='At FuturStox, we are revolutionizing the way investments are made. Our system is tailored to the diverse needs of educators, seasoned investors, and novices in the world of finance and technology. By harnessing the power of machine learning to forecast stock prices, we present a unique platform that serves as a valuable resource for anybody exploring AI applications in finance. For seasoned investors, our platform offers accurate, near-real-time predictions to drive strategic investment decisions. Even for those without any background in machine learning, FuturStox offers an intuitive and user-friendly interface that allows everyone to benefit from advanced AI insights. With FuturStox, you are equipped with cutting-edge tools to navigate the financial markets with confidence.'/>
      </div>
      <div className='ml__whatML-heading'>
        <h1 className='gradient__text'>Predicting Profits, Powering Portfolios: Your Future in Finance with Machine Learning</h1>
        <p>Trade with more confidence</p>
      </div>
      <div className='ml__whatML-container'>
      <Features title='Learn' text='Delve into the fascinating world of finance and machine learning with FuturStox. Whether you are a savvy investor or a curious beginner, our platform is designed to educate. Gain an in-depth understanding of financial markets and how machine learning models are used to predict stock prices. Equip yourself with knowledge that goes beyond the surface, fostering a comprehensive understanding that aids in smart decision-making.' />
      <Features title='Tune' text='FuturStox is not just about providing predictions—it is about personalising your experience. Our platform offers users the unique opportunity to tune the machine learning models to their preferences.' />
      <Features title='Predict' text='Utilising a powerful combination of offline and online learning models, our platform delivers timely predictions of stock prices. With this information at your fingertips, you can make informed decisions that are based on sophisticated AI insights, rather than mere speculation. FuturStox is more than a tool—it is your partner in navigating the dynamic world of investments.' />
      </div>
      
    </div>
  )
}

export default ML
