/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

const fetch = require("node-fetch");

exports.handler = async (event, context) => {
  console.log("Event:", event); // Log the incoming event for debugging

  const GRAPHQL_ENDPOINT = process.env.API_MACHINELEARNINGAPP_GRAPHQLAPIENDPOINTOUTPUT;
  const GRAPHQL_API_KEY = process.env.API_MACHINELEARNINGAPP_GRAPHQLAPIKEYOUTPUT;

  console.log("GraphQL Endpoint:", GRAPHQL_ENDPOINT); // Log the endpoint (do not log the API key for security reasons)

const query = /* GraphQL */ `
    mutation CREATE_USERS($input: CreateUsersInput!) {
      createUsers(input: $input) {
        email
      }
    }
  `;

  const variables = {
    input: {
      email: event.request.userAttributes.email,
    },
  };

  const options = {
    method: "POST",
    headers: {
      "x-api-key": GRAPHQL_API_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables }),
  };

  const response = {};

  try {
    const res = await fetch(GRAPHQL_ENDPOINT, options);
    response.data = await res.json();
    console.log("GraphQL Response:", response.data); // Log the GraphQL response

    if (response.data.errors) {
      console.error("GraphQL Errors:", response.data.errors); // Log any GraphQL errors
      response.statusCode = 400;
    }
  } catch (error) {
    console.error("Error:", error); // Log any other errors
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

  return {
    ...response,
    body: JSON.stringify(response.body),
  };
};
