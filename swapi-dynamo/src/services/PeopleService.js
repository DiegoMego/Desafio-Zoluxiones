// const AWS = require('aws-sdk');
// const dynamodb = new AWS.DynamoDB();

const api = require('../api/index');

class PeopleService {
  constructor() {}

  async getPeople({ id, page }) {
    if (parseInt(id) && id > 0) return await this.get(id);
    else if (page === undefined || (parseInt(page) && page > 0))
      return await this.list(page);
    return null;
  }

  async list(page) {
    return await api.people.list(page);
  }

  async get(id) {
    return await api.people.get(id);
  }
}

module.exports = PeopleService;