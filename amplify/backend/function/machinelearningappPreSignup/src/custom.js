/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

// Importing the node-fetch library for making HTTP requests
const fetch = require("node-fetch");

// The Lambda function handler
exports.handler = async (event, context) => {
  // Logging the incoming event for debugging purposes
  console.log("Event:", event);

  // GraphQL endpoint and API key from environment variables
  const GRAPHQL_ENDPOINT = process.env.API_MACHINELEARNINGAPP_GRAPHQLAPIENDPOINTOUTPUT;
  const GRAPHQL_API_KEY = process.env.API_MACHINELEARNINGAPP_GRAPHQLAPIKEYOUTPUT;
  console.log("GraphQL Endpoint:", GRAPHQL_ENDPOINT);

  // Define the GraphQL mutation query for creating users
  const query = /* GraphQL */ `
    mutation CREATE_USERS($input: CreateUsersInput!) {
      createUsers(input: $input) {
        email
      }
    }
  `;

  // Defining variables for the GraphQL query
  const variables = {
    input: {
      email: event.request.userAttributes.email,
    },
  };

  // Defining options for the fetch request
  const options = {
    method: "POST",
    headers: {
      "x-api-key": GRAPHQL_API_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables }),
  };

  // Initialising an empty response object
  const response = {};

  try {
    // Make the fetch request to the GraphQL endpoint
    const res = await fetch(GRAPHQL_ENDPOINT, options);
    
    // Parse and store the JSON response
    response.data = await res.json();

    // Logging the GraphQL response for debugging
    console.log("GraphQL Response:", response.data);

    // Checking for GraphQL errors and log them if any
    if (response.data.errors) {
      console.error("GraphQL Errors:", response.data.errors);
      response.statusCode = 400;
    }
  } catch (error) {
    // Logging any other errors that may occur
    console.error("Error:", error);
    response.statusCode = 400;
    response.body = {
      errors: [
        {
          message: error.message,
          stack: error.stack,
        },
      ],
    };
  }

  // Return the response object
  return {
    ...response,
    body: JSON.stringify(response.body),
  };
};
