// const AWS = require('aws-sdk');
// const dynamodb = new AWS.DynamoDB();

const api = require('../api/index');
const { translate } = require('../shared/helpers');
const { STATUSCODES, ERRORMESSAGES, LANGUAGES } = require('../shared/constants');

class PeopleService {
  constructor() {}

  async getPeople({ id, page }) {
    if (parseInt(id) && id > 0) return await this.get(id);
    else if (page === undefined || (parseInt(page) && page > 0))
      return await this.list(page);
    return {
      statusCode: STATUSCODES.BAD_REQUEST,
      body: JSON.stringify({
        success: false,
        errorMessage: ERRORMESSAGES.BAD_REQUEST,
      }),
    };
  }

  async list(page) {
    const results = [];
    try {
      const swapiData = await api.people.list(page);
      const parsedData = JSON.parse(swapiData);
      const people = parsedData.results;
      for (const person of people) {
        results.push(translate(person, LANGUAGES.SPANISH));
      }
    } catch (error) {
      return {
        statusCode: STATUSCODES.INTERNAL_SERVER_ERROR,
        body: JSON.stringify({
          success: false,
          errorMessage: ERRORMESSAGES.INTERNAL_SERVER_ERROR,
        }),
      };
    }
    return {
      statusCode: STATUSCODES.OK,
      body: JSON.stringify({
        success: true,
        result: results,
      }),
    };
  }

  async get(id) {
    return await api.people.get(id);
  }
}

module.exports = PeopleService;