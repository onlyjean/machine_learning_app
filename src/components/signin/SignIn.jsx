import React from 'react'
import './signin.css'
import { Authenticator } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css';
import { useNavigate } from 'react-router-dom';




const SignIn = () => {
    
const navigate = useNavigate();


  return (
   
   <Authenticator usernameAlias="email" signUpConfig={{ hideAllDefaults: true }}>

{({ signOut, user }) => (

    <div>
      <button onClick={signOut}>Sign out</button>
      {user && navigate("/")}
    </div>
    
    )}
    </Authenticator>
  )
}

export default SignIn
