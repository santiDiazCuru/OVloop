/*
 * Use the default endpoints provided by localstack
 */
const localstack = require('node-localstack')();
 
 
/*************/
 
 
/*
 * Use custom endpoints
 */
 
// Endpoints should contain the endpoint for each service
// not using the default endpoint provided by localstack
const endpoints = {
  'APIGateway': 'http://localhost:4201',
  'CloudFormation': 'http://localhost:4202',
  'CloudWatch': 'http://localhost:4203',
  'DynamoDB': 'http://localhost:4204',
  'ES': 'http://localhost:4205',
  'Firehose': 'http://localhost:4206',
  'Kinesis': 'http://localhost:4207',
  'Lambda': 'http://localhost:4208',
  'Redshift': 'http://localhost:4209',
  'Route53': 'http://localhost:4210',
  'S3': 'http://localhost:4211',
  'SES': 'http://localhost:4212',
  'SNS': 'http://localhost:4575',
  'SQS': 'http://localhost:4214',
  'SSM': 'http://localhost:4215'
};
 
const AWS = require('node-localstack')(endpoints);







// // Load the AWS SDK for Node.js
// var AWS = require('aws-sdk');

// Set region
// AWS.config.update({region: 'REGION'});

// Create publish parameters
var params = {
  Message: 'MESSAGE_TEXT', /* required */
  TopicArn: 'TOPIC_ARN'
};

// Create promise and SNS service object
var publishTextPromise = new AWS.SNS({apiVersion: '2010-03-31', region: "us-east-1"}).publish(params).promise();

// Handle promise's fulfilled/rejected states
publishTextPromise.then(
  function(data) {
    console.log("Message ${params.Message} send sent to the topic ${params.TopicArn}");
    console.log("MessageID is " + data.MessageId);
  }).catch(
    function(err) {
    console.error(err, err.stack);
  });