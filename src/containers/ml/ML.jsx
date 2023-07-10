import React from 'react'
import { Features } from '../../components'
import './ml.css'


const ML = () => {
  return (
    <div className='ml__whatML section__margin' id='about'>
      <div className='ml__whatML-feature'>
        <Features title= 'About FuturStox' text='At FuturStox, we are revolutionising the way investments are made. Our system is tailored to the diverse needs of educators, seasoned investors, and novices in the world of finance and technology. By harnessing the power of machine learning to forecast stock prices, we present a unique platform that serves as a valuable resource for anybody exploring AI applications in finance. For seasoned investors, our platform offers accurate, near-real-time predictions to drive strategic investment decisions. Even for those without any background in machine learning, FuturStox offers an intuitive and user-friendly interface that allows everyone to benefit from advanced AI insights. With FuturStox, you are equipped with cutting-edge tools to navigate the financial markets with confidence.'/>
      </div>
      <div className='ml__whatML-heading'>
        <h1 className='gradient__text'>Predicting Profits, Powering Portfolios: Your Future in Finance with Machine Learning</h1>
        {/* <p>Trade with more confidence</p> */}
      </div>
      <div className='ml__whatML-container'>
      <Features title='Learn' text='Embark on a journey with FuturStox to deepen your understanding of financial markets and machine learning, empowering you with comprehensive knowledge for informed decision-making.' />
      <Features title='Tune' text='FuturStox is not just about providing predictions—it is about personalising your experience. Our platform offers users the unique opportunity to tune the machine learning models to their preferences.' />
      <Features title='Predict' text='FuturStox near real-time prediction, powered by sophisticated AI insights, provides you with accurate stock price forecasts, making it your reliable partner in navigating the dynamic world of investments.' />
      </div>
    </div>
  )
}

export default ML
