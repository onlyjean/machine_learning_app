
const express = require('express')
const bodyParser = require('body-parser')
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')


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
  

const AWS = require('aws-sdk');
const cognito = new AWS.CognitoIdentityServiceProvider();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

app.get('/check-subscriptions', async (req, res) => {
  // List all users in the Cognito user pool
  const users = await cognito.listUsers({
    UserPoolId: 'eu-west-2_d852nM2qL',
  }).promise();

  // For each user, get their Stripe customer ID and check their subscription status
  const subscriptionStatuses = await Promise.all(users.Users.map(async user => {
    // Get the user's Stripe customer ID from their Cognito attributes
    const stripeCustomerAttr = user.Attributes.find(attr => attr.Name === 'custom:stripeCustomerId');

     // Check if the attribute exists
    if (!stripeCustomerAttr) {
      console.log(`User ${user.Username} does not have a Stripe customer ID.`);
      return { email: user.Username, isSubscribed: false };
    }

    const stripeCustomerId = stripeCustomerAttr.Value;

    // Retrieve the customer's subscriptions from Stripe
    const subscriptions = await stripe.subscriptions.list({
      customer: stripeCustomerId,
    });

    // Check if the user has an active subscription
  const isSubscribed = subscriptions.data.some(subscription => subscription.status === 'active');

  console.log(`User ${user.Username} subscription status: ${isSubscribed}`);

  // Return the user's email and subscription status
  return { email: user.Username, isSubscribed };

  }));

  // Return the subscription statuses
  res.json(subscriptionStatuses);
});

module.exports = app;
