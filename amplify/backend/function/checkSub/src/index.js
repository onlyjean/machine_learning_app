const awsServerlessExpress = require('aws-serverless-express');
const app = require('./app');  // assuming your Express app is exported from a file named app.js

const server = awsServerlessExpress.createServer(app);

exports.handler = (event, context) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);
  return awsServerlessExpress.proxy(server, event, context, 'PROMISE').promise;
};
