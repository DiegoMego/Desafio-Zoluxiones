const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB();

const { DYNAMODB_TABLENAME, STATUSCODES, ERRORMESSAGES } = require('../shared/constants');
const PeopleRequestParams = require('../models/PeopleRequestParams');
const PeopleModel = require('../models/PeopleModel');

class DynamoService {
  constructor() {}

  async save(params) {
    const err = {
      statusCode: STATUSCODES.BAD_REQUEST,
      body: JSON.stringify({
        success: false,
        errorMessage: ERRORMESSAGES.BAD_REQUEST,
      }),
    };
    try {
      const requestParams = new PeopleRequestParams(params.nombre, params.edad, params.genero);
      const { error, value } = requestParams.validate();
      console.log(error);
      if (error) return err;
      const peopleModel = new PeopleModel(requestParams);
      const result = await this.savePersonToDynamo(peopleModel);
      return {
        statusCode: STATUSCODES.OK,
        body: JSON.stringify({
          success: true,
          result,
        }),
      };
    } catch (error) {
      return {
        statusCode: STATUSCODES.INTERNAL_SERVER_ERROR,
        body: JSON.stringify({
          success: false,
          errorMessage: ERRORMESSAGES.INTERNAL_SERVER_ERROR,
        }),
      };
    }
  }

  async getPeople() {
    try {
      const result = await this.getPeopleFromDynamo();
      return {
        statusCode: STATUSCODES.OK,
        body: JSON.stringify({
          success: true,
          result,
        }),
      };
    } catch (error) {
      return {
        statusCode: STATUSCODES.INTERNAL_SERVER_ERROR,
        body: JSON.stringify({
          success: false,
          errorMessage: ERRORMESSAGES.INTERNAL_SERVER_ERROR,
        }),
      };
    }
  }

  async savePersonToDynamo(peopleModel) {
    return new Promise((resolve, reject) => {
      const params = {
        "TableName": DYNAMODB_TABLENAME,
        Item: {
          "nombre": {
            S: peopleModel.nombre
          },
          "edad": {
            N: `${peopleModel.edad}`
          },
          "genero": {
            S: peopleModel.genero
          }
        }
      }

      dynamodb.putItem(params, (err, results) => {
        if (err) {
          console.log(`Error returned with params = ${JSON.stringify(params)}`);
          console.log(err, err.stack);
          return reject(err);
        }
        return resolve(results);
      });
    });
  }

  async getPeopleFromDynamo() {
    return new Promise((resolve, reject) => {
      const params = {
        TableName: DYNAMODB_TABLENAME
      };

      dynamodb.scan(params, (err, results) => {
        if (err) {
          console.log(`Error returned with params = ${JSON.stringify(params)}`);
          console.log(err, err.stack);
          return reject(err);
        }
        return resolve(results);
      })
    })
  }
}

module.exports = DynamoService;