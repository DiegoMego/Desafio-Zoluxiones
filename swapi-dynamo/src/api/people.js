const { fetch } = require('../shared/helpers');

const people = {
  get: async(id) => await fetch.get(`https://swapi.py4e.com/api/people/${id}/`),
  list: async (page = 1) => await fetch.get(`https://swapi.py4e.com/api/people/?page=${page}`)
};

module.exports = people;