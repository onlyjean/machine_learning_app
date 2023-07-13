import { Authenticator, Card, Heading, Text, ThemeProvider } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './signin.css';


// ... other imports ...

const SignIn = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // Navigate to the home page when the user state changes
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    
    <>
    {/* Apply the button-container CSS class to the button container */}
    <div className="button-container">
      <button className="signin-button" onClick={() => navigate("/")}>Home</button>
    </div>
    <div className='signIn-background section__padding'>
      <Authenticator usernameAlias="email" signUpConfig={{ hideAllDefaults: true }}>
        {({ signOut, user: authUser }) => {
          // Update the user state when the user prop changes
          if (authUser && user !== authUser) {
            setUser(authUser);
          }

          return (
            <div>
              <button className="signin-button" onClick={signOut}>Sign out</button>
            </div>
          );
        }}
      </Authenticator>
    </div>
  </>
);
}

export default SignIn;


