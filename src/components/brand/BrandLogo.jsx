import React from 'react';
import './brand.css'
import {google, airflow, aws, docker, kubernetes} from './imgImports'

const Brand = () => {
  return (
    <div className='ml__brand section__padding'>
       <div>
        <img src={google} alt='google' />
       </div>
       <div>
        <img src={aws} alt='aws' />
       </div>
       <div>
        <img src={airflow} alt='airflow' />
       </div>
       <div>
        <img src={docker} alt='docker' />
       </div>
       <div>
        <img src={kubernetes} alt='kubernetes' />
       </div>
    </div>
  )
}

export default Brand
