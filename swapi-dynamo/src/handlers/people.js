const { requestProcessor } = require('../processors/apiGateway');
const DynamoService = require('../services/DynamoService');

module.exports.run = async (event, context, callback) => {
  // Log the event
  console.log('LAMBDA WILL BEGIN PROCESSING THE FOLLOWING EVENT:');
  console.log(event);

  // Transform event object
  const payload = requestProcessor(event);
  const response = await eventRouter(payload);
  callback(null, response);
};

const eventRouter = async (payload) => {
  const params = payload.params;
  const response = await (new DynamoService()).save(params);
  return response;
};
