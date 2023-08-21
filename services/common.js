const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient()

module.exports = {

  updateItemByKey: async (table, keyFilter, itemToUpdate) => {
    try {
      const keyFilterStringify = JSON.stringify(keyFilter);
      console.log(`Updating item ${keyFilterStringify} with value ${itemToUpdate}`)
      if (!itemToUpdate || Object.keys(itemToUpdate).length === 0) {
        return;
      }
      const updateParams = {
        TableName: table,
        Key: keyFilter,
        UpdateExpression: 'SET',
        ExpressionAttributeNames: {},
        ExpressionAttributeValues: {},
        ReturnValues: 'ALL_NEW'
      }

      Object.keys(itemToUpdate).map(key => {
        updateParams.UpdateExpression += ` #${key} = :${key},`
        updateParams.ExpressionAttributeNames[`#${key}`] = key
        updateParams.ExpressionAttributeValues[`:${key}`] = itemToUpdate[key]
      })
      updateParams.UpdateExpression = updateParams.UpdateExpression.substr(0, updateParams.UpdateExpression.length - 1)

      const updateResult = await docClient.update(updateParams).promise()
      return updateResult.Attributes
    } catch (e) {
      console.log('err', e);
      return e
    }
  },
}