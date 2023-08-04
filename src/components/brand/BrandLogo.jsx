import React from 'react';
import './brand.css'
import {google, streamlit, aws, reactlogo, docker, python, mlflow} from './imgImports'

const Brand = () => {
  return (
    <div className='ml__brand section__padding'>
       <div>
        <img src={google} alt='google' />
       </div>
       <div>
        <img src={streamlit} alt='streamlit' />
       </div>
       <div>
        <img src={aws} alt='aws' />
       </div>
       <div>
        <img src={reactlogo} alt='reactlogog' />
       </div>
       <div>
        <img src={docker} alt='docker' />
       </div>
       <div>
        <img src={python} alt='python' />
       </div>
       <div>
        <img src={mlflow} alt='mlflow' />
       </div>
    </div>
  )
}

export default Brand
