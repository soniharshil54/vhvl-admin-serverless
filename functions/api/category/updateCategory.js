const CommonService = require('../../../services/common');
const { CATEGORY_TABLE } = process.env;

module.exports.handler = async (event) => {
  console.log('event', event);
  const params = { ...JSON.parse(event.body), ...event.pathParameters }
  const { id } = params;
  console.log('params', params);

  // const categorys =  [
  //   {
  //     "id": "1",
  //     "hospitalName": "AG",
  //     "envName": "AG ENV",
  //     "description": "AG DESC",
  //   },
  //   {
  //     "id": "2",
  //     "hospitalName": "Einstein Medical Center",
  //     "envName": "Einstein Medical Center ENV",
  //     "description": "Einstein Medical Center DESC",
  //   },
  // ]

  // const updatedCategorys = categorys.map((env) => {
  //   if(env.id === id) {
  //     return {
  //       ...env,
  //       ...params
  //     }
  //   } else {
  //     return env
  //   }
  // })

  delete params.id;
  const updateItemResponse = await CommonService.updateItemByKey(CATEGORY_TABLE, { id }, params);
  console.log('updateItemResponse', updateItemResponse);

  const responseBody = {
    data: updateItemResponse
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
