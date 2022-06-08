const routes = require('../routes');
const { requestProcessor } = require('../processors/apiGateway');
const PeopleService = require('../services/PeopleService');

module.exports.run = async (event, context, callback) => {
  // Log the event
  console.log('LAMBDA WILL BEGIN PROCESSING THE FOLLOWING EVENT:');
  console.log(event);

  // Transform event object
  const payload = requestProcessor(event);
  const response = await eventRouter(payload);
  console.log('RESPONSE:');
  console.log(response);
  callback(null, response);
  // return {
  //   statusCode: 200,
  //   data: JSON.stringify(
  //     response,
  //     null,
  //     2
  //   ),
  // };
};

const eventRouter = async (payload) => {
  let response;
  const params = payload.params;
  const route = `${params.type?.toLowerCase()}`;
  switch (route) {
    case routes.people:
      const peopleService = new PeopleService();
      response = await peopleService.getPeople(params);
      break;
    default:
      break;
  }
  return response;
};

// module.exports.hello = async (event) => {
//   return {
//     statusCode: 200,
//     body: JSON.stringify(
//       {
//         message: "Go Serverless v3.0! Your function executed successfully!",
//         input: event,
//       },
//       null,
//       2
//     ),
//   };
// };
