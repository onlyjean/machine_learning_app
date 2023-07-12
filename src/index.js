import React from 'react';
import ReactDOM from 'react-dom';
import App from './App/App';
import './index.css';

//aws imports

import { Amplify } from 'aws-amplify';
import config from './aws-exports';
import  '@aws-amplify/ui-react/styles.css'
import { BrowserRouter, Router } from 'react-router-dom';
import { AmplifyProvider } from '@aws-amplify/ui-react';


Amplify.configure(config);

const theme = {
    name: 'custom',
    tokens: {
        colors: {
            background: {
                primary: { value:'black' }
                
            }
        }
    }

}


ReactDOM.render(
<AmplifyProvider theme={theme}>
    <BrowserRouter>
        <App />
    </BrowserRouter> 
</AmplifyProvider>, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

