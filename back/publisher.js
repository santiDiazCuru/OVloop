// publisher.js
const AWS = require('aws-sdk');
const { promisify } = require('util');
// LocalStack uses the 'us-east-1' region by default
AWS.config.update({ region: 'us-east-2' });
// the endpoint param is important!
// if it wasn't defined AWS would request the production endpoint
const sns = new AWS.SNS({ endpoint: 'http://localhost:4575' });
// I prefer working w/ promises
// rather than w/ callbacks
// therefore I'm making "sns.publish" return promise
sns.publish = promisify(sns.publish);
const TopicArn = 'arn:aws:sns:us-east-2:123456789012:local-topic';
 var publish = async function(msg, phoneNumber) {
  const publishParams = {
    // TopicArn,
    Message: msg,
    PhoneNumber: phoneNumber,
  };
  let topicRes;
  try {
      console.log('entra al TRY')
    topicRes = await sns.publish(publishParams);
  } catch (e) {
    console.log('entra al CATCH')
    topicRes = e;
  }
  console.log('TOPIC Response: ', topicRes);
  return topicRes.ResponseMetadata
}
// for (let i = 0; i < 5; i++) {
//   publish('message #' + i, '124235'+i)
//   .then((res)=>console.log('algo asi sabemos que es', res));
// }

module.exports = {publish}

// aws \
// sns create-topic \
// --name local-topic \
// --endpoint-url http://localhost:4575 \
// --region us-east-1 


// arn:aws:sns:us-east-2:123456789012:arntest