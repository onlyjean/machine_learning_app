import React from 'react'
import './signin.css'
import { Authenticator } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css';
import { useNavigate } from 'react-router-dom';
import { Card, Heading, Text, ThemeProvider } from '@aws-amplify/ui-react';




const SignIn = () => {
    
const navigate = useNavigate();


  return (
    <div className='signIn-background section__padding'>
   <Authenticator usernameAlias="emai" signUpConfig={{ hideAllDefaults: true }}>

{({ signOut, user }) => (

    <div>
      <button onClick={signOut}>Sign out</button>
      {user && navigate("/")}
    </div>
    
    )}
    </Authenticator>
    </div>
  )
}

export default SignIn
