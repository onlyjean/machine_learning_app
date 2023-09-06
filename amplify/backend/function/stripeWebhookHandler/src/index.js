const fetch = require('node-fetch');
const aws4 = require('aws4');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// AWS AppSync configuration
const awsmobile = {
    graphqlEndpoint: "https://y4phlwteercpflrdx6pawip3dm.appsync-api.eu-west-2.amazonaws.com/graphql",
    region: "eu-west-2",
    authenticationType: "API_KEY",
    apiKey: "da2-q5rjn4gqwnfyza3h4pccmvcipm",
};

// GraphQL query for creating a subscription
const createSubscriptionQuery = `
  mutation CreateStripeSubscription($input: CreateStripeSubscriptionInput!) {
    createStripeSubscription(input: $input) {
      id
      stripeSubscriptionId
      plan
      status
      userId
    }
  }
`;

// GraphQL query for updating a subscription
const updateSubscriptionQuery = `
  mutation UpdateStripeSubscription($input: UpdateStripeSubscriptionInput!) {
    updateStripeSubscription(input: $input) {
      id
      status
    }
  }
`;

// Function to make a GraphQL request
const makeGraphQLRequest = async (query, variables) => {
    const requestBody = {
        query: query,
        variables: variables
    };

    // Sign the request using AWS4
    const signedRequest = aws4.sign({
        method: 'POST',
        url: awsmobile.graphqlEndpoint,
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': awsmobile.apiKey
        },
        body: JSON.stringify(requestBody),
        service: 'appsync',
        region: awsmobile.region
    });

    // Make the fetch request
    const response = await fetch(signedRequest.url, {
        method: 'POST',
        headers: signedRequest.headers,
        body: JSON.stringify(requestBody)
    });

    // Parse the response
    const responseData = await response.json();
    if (responseData.errors) {
        console.error("GraphQL errors:", responseData.errors);
    }
    return responseData;
};

// Lambda function handler
exports.handler = async (event) => {
    const sig = event.headers['stripe-signature'];
    let stripeEvent;

    
    try {
        stripeEvent = stripe.webhooks.constructEvent(event.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
        console.error(`Failed to verify webhook signature: ${err.message}`);
        return {
            statusCode: 400,
            body: `Webhook Error: ${err.message}`
        };
    }
    // Create a subscription record
    if (stripeEvent.type === 'checkout.session.completed') {
        const session = stripeEvent.data.object;
        const username = session.client_reference_id;

        const subscriptionData = {
            stripeSubscriptionId: session.id,
            plan: 'Premium Plan',
            status: 'active',
            userId: username
        };

        try {
            const result = await makeGraphQLRequest(createSubscriptionQuery, { input: subscriptionData });
            console.log("StripeSubscription record created:", result);
        } catch (error) {
            console.error("Error creating StripeSubscription record:", error);
        }
    }

    // Handle customer.subscription.deleted event
    if (stripeEvent.type === 'customer.subscription.deleted') {
        const subscription = stripeEvent.data.object;

        const subscriptionData = {
            id: subscription.id,
            status: 'cancelled'
        };

        // Update the subscription record to cancelled
        try {
            const result = await makeGraphQLRequest(updateSubscriptionQuery, { input: subscriptionData });
            console.log("StripeSubscription record status updated to cancelled:", result);
        } catch (error) {
            console.error("Error updating StripeSubscription record status:", error);
        }
    }

    // Return a 200 status code
    return {
        statusCode: 200,
        body: JSON.stringify({ received: true }),
    };
};
