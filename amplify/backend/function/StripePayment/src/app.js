/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/




const express = require('express')
const bodyParser = require('body-parser')
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
// stripe import
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const AWS = require('aws-sdk');
const cognito = new AWS.CognitoIdentityServiceProvider();




// declare a new express app
const app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
});


app.post('/create-checkout-session', async (req, res) => {

  const { username } = req.body;  // Extract username from the request body

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [{
      price: 'price_1NUUb5GGfDL03j8njMw0Myta',  // Using the price ID directly
      quantity: 1,
    }],
    mode: 'subscription',
    success_url: 'http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}',
    cancel_url: 'http://localhost:3000/signedin',
    client_reference_id: username,  // Set the client_reference_id to the username
    metadata: {  // Add metadata field
      username: username,  // Include username in the metadata
    },
  });
  res.json({ id: session.id });
});


app.post('/webhook', bodyParser.raw({type: 'application/json'}), async (req, res) => {
  const sig = req.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

    // Log the event type and data
    console.log(`Received event with type ${event.type}`);
    console.log(`Event data: ${JSON.stringify(event.data)}`);
  

  // Handle the checkout.session.completed event
  if (event.type === 'checkout.session.completed') {
    console.log("checkout.session.completed event received");
      const session = event.data.object;

    // Get the user's username from the client reference ID
    const username = session.client_reference_id;

    console.log(`Username: ${username}`);
    console.log(`Customer ID: ${session.customer}`);

    // Update the user's Stripe customer ID in Cognito
    try {
      await cognito.adminUpdateUserAttributes({
        UserPoolId: 'eu-west-2_d852nM2qL',
        Username: username,
        UserAttributes: [
          {
            Name: 'custom:stripeCustomerId',
            Value: session.customer,
          },
        ],
      }).promise();
      console.log(`Updated Stripe customer ID for user ${username}`);
    } catch (error) {
      console.error(`Error updating user attributes: ${error}`);
    }
  }
    

  // Handle the customer.subscription.deleted event
  if (event.type === 'customer.subscription.deleted') {
    const subscription = event.data.object;

    // Get the user's username from the client reference ID
    const username = subscription.metadata.username;

    // Update the user's Stripe customer ID in Cognito to be empty
    await cognito.adminUpdateUserAttributes({
      UserPoolId: 'eu-west-2_d852nM2qL',
      Username: username,
      UserAttributes: [
        {
          Name: 'custom:stripeCustomerId',
          Value: '',
        },
      ],
    }).promise();

    console.log(`Cleared Stripe customer ID for user ${username}`);
  }

  res.json({received: true});
});


/**********************
 * Example get method *
 **********************/

app.get('/item', function(req, res) {
  // Add your code here
  res.json({success: 'get call succeed!', url: req.url});
});

app.get('/item/*', function(req, res) {
  // Add your code here
  res.json({success: 'get call succeed!', url: req.url});
});

/****************************
* Example post method *
****************************/

app.post('/item', function(req, res) {
  // Add your code here
  res.json({success: 'post call succeed!', url: req.url, body: req.body})
});

app.post('/item/*', function(req, res) {
  // Add your code here
  res.json({success: 'post call succeed!', url: req.url, body: req.body})
});

/****************************
* Example put method *
****************************/

app.put('/item', function(req, res) {
  // Add your code here
  res.json({success: 'put call succeed!', url: req.url, body: req.body})
});

app.put('/item/*', function(req, res) {
  // Add your code here
  res.json({success: 'put call succeed!', url: req.url, body: req.body})
});

/****************************
* Example delete method *
****************************/

app.delete('/item', function(req, res) {
  // Add your code here
  res.json({success: 'delete call succeed!', url: req.url});
});

app.delete('/item/*', function(req, res) {
  // Add your code here
  res.json({success: 'delete call succeed!', url: req.url});
});

app.listen(3000, function() {
    console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
