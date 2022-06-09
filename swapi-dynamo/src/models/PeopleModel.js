class PeopleModel {
  constructor(requestParams) {
    this.nombre = requestParams.nombre;
    this.edad = requestParams.edad;
    this.genero = requestParams.genero;
  }
}

module.exports = PeopleModel;