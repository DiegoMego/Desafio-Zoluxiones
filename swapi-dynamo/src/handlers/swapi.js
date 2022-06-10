const routes = require('../routes');
const { requestProcessor } = require('../processors/apiGateway');
const SwapiService = require('../services/SwapiService');
const DynamoService = require('../services/DynamoService');
const { STATUSCODES, ERRORMESSAGES } = require('../shared/constants');

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
  let response;
  const params = payload.params;
  const route = `${params.type?.toLowerCase()}`;
  switch (route) {
    case routes.swapi:
      const swapiService = new SwapiService();
      response = await swapiService.getPeople(params);
      break;
    case routes.list:
      response = await (new DynamoService()).getPeople();
      break;
    default:
      response = {
        statusCode: STATUSCODES.BAD_REQUEST,
        body: JSON.stringify({
          success: false,
          errorMessage: ERRORMESSAGES.BAD_REQUEST,
        }),
      };
      break;
  }
  return response;
};
