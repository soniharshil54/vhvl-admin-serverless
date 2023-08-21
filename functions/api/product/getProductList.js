const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();
const { PRODUCT_TABLE } = process.env;

module.exports.handler = async (event) => {
  console.log('event', event);

  const scanParams = {
    TableName: PRODUCT_TABLE,
  };
  console.log('scanParams', scanParams);
  const putItemResponse = await docClient.scan(scanParams).promise();
  console.log('putItemResponse', putItemResponse);
  const records = putItemResponse && putItemResponse.Items || [];
  const responseBody = {
    data: records
  }
  console.log('responseBody', responseBody);
  const response = {
    statusCode : 200,
    body : JSON.stringify(responseBody),
    isBase64Encoded : false,
    headers : {"content-type" : "application/json"}
  }
  return response;
}
