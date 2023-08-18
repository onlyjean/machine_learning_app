const express = require('express');
const bodyParser = require('body-parser');
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const AWS = require('aws-sdk');
const cognito = new AWS.CognitoIdentityServiceProvider();
const fetch = require('node-fetch');
const aws4 = require('aws4');

const app = express();
// app.use(bodyParser.json());
app.use(awsServerlessExpressMiddleware.eventContext());

app.use(function(req, res, next) {
    console.log("Received request:", req.method, req.url);
    console.log("Request headers:", req.headers);
    console.log("Request body:", req.body);
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    next();
});

const makeGraphQLRequest = async (query, variables) => {
    console.log("Making GraphQL request with query:", query);
    console.log("Variables:", variables);

    const requestBody = {
        query: query,
        variables: variables
    };

    const signedRequest = aws4.sign({
        method: 'POST',
        url: 'https://y4phlwteercpflrdx6pawip3dm.appsync-api.eu-west-2.amazonaws.com/graphql',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': 'da2-q5rjn4gqwnfyza3h4pccmvcipm'
        },
        body: JSON.stringify(requestBody),
        service: 'appsync',
        region: 'eu-west-2'
    });

    const response = await fetch(signedRequest.url, {
        method: 'POST',
        headers: signedRequest.headers,
        body: JSON.stringify(requestBody)
    });

    const responseData = await response.json();
    console.log("GraphQL response:", responseData);
    return responseData;
};

app.post('/create-checkout-session', bodyParser.json(), async (req, res) => {  
    console.log("Handling /create-checkout-session endpoint");

    console.log("Raw request body:", req.body.toString());


    const { username } = req.body;

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [{
            price: 'price_1Nb7sTGGfDL03j8nedwYY4zH',
            quantity: 1,
        }],
        mode: 'subscription',
        success_url: 'http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}',
        cancel_url: 'http://localhost:3000/signedin',
        client_reference_id: username,
        metadata: {
            username: username,
        },
    });

    console.log("Stripe session created:", session);

    const subscriptionData = {
        stripeSubscriptionId: session.id,
        plan: 'LSTM Model',
        status: 'active',
        userId: username
    };

    try {
        const result = await makeGraphQLRequest(`
            mutation CreateStripeSubscription($input: CreateStripeSubscriptionInput!) {
                createStripeSubscription(input: $input) {
                    id
                    stripeSubscriptionId
                }
            }
        `, { input: subscriptionData });
        console.log("StripeSubscription record created:", result);
    } catch (error) {
        console.error("Error creating StripeSubscription record:", error);
    }

    res.json({ id: session.id });
});

app.post('/webhook', bodyParser.raw({type: 'application/json'}), async (req, res) => {
    console.log("Handling /webhook endpoint");

    console.log("Raw request body:", req.body.toString('utf8')); // Log the raw request body

    const sig = req.headers['stripe-signature'];

    let event;
    try {
        event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
        console.error(`Failed to verify webhook signature: ${err.message}`);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    console.log(`Received event with type ${event.type}`);
    console.log(`Event data: ${JSON.stringify(event.data)}`);

    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;
        const username = session.client_reference_id;

        console.log(`Username: ${username}`);
        console.log(`Customer ID: ${session.customer}`);

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

        const subscriptionData = {
            stripeSubscriptionId: session.id,
            plan: 'LSTM Model',
            status: 'active',
            userId: username
        };

        try {
            const result = await makeGraphQLRequest(`
                mutation UpdateStripeSubscription($input: UpdateStripeSubscriptionInput!) {
                    updateStripeSubscription(input: $input) {
                        id
                        stripeSubscriptionId
                    }
                }
            `, { input: subscriptionData });
            console.log("StripeSubscription record updated:", result);
        } catch (error) {
            console.error("Error updating StripeSubscription record:", error);
        }
    }

    if (event.type === 'customer.subscription.deleted') {
        const subscription = event.data.object;

        const subscriptionData = {
            id: subscription.id,
            status: 'cancelled'
        };

        try {
            const result = await makeGraphQLRequest(`
                mutation UpdateStripeSubscription($input: UpdateStripeSubscriptionInput!) {
                    updateStripeSubscription(input: $input) {
                        id
                        status
                    }
                }
            `, { input: subscriptionData });
            console.log("StripeSubscription record status updated to cancelled:", result);
        } catch (error) {
            console.error("Error updating StripeSubscription record status:", error);
        }
    }

    res.json({received: true});
});

module.exports = app;
