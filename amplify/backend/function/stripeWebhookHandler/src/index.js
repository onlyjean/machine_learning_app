const fetch = require('node-fetch');
const aws4 = require('aws4');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const awsmobile = {
    graphqlEndpoint: "https://y4phlwteercpflrdx6pawip3dm.appsync-api.eu-west-2.amazonaws.com/graphql",
    region: "eu-west-2",
    authenticationType: "API_KEY",
    apiKey: "da2-q5rjn4gqwnfyza3h4pccmvcipm",
};

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

const updateSubscriptionQuery = `
  mutation UpdateStripeSubscription($input: UpdateStripeSubscriptionInput!) {
    updateStripeSubscription(input: $input) {
      id
      status
    }
  }
`;

const makeGraphQLRequest = async (query, variables) => {
    const requestBody = {
        query: query,
        variables: variables
    };

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

    const response = await fetch(signedRequest.url, {
        method: 'POST',
        headers: signedRequest.headers,
        body: JSON.stringify(requestBody)
    });

    const responseData = await response.json();
    if (responseData.errors) {
        console.error("GraphQL errors:", responseData.errors);
    }
    return responseData;
};

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

    if (stripeEvent.type === 'customer.subscription.deleted') {
        const subscription = stripeEvent.data.object;

        const subscriptionData = {
            id: subscription.id,
            status: 'cancelled'
        };

        try {
            const result = await makeGraphQLRequest(updateSubscriptionQuery, { input: subscriptionData });
            console.log("StripeSubscription record status updated to cancelled:", result);
        } catch (error) {
            console.error("Error updating StripeSubscription record status:", error);
        }
    }

    return {
        statusCode: 200,
        body: JSON.stringify({ received: true }),
    };
};
