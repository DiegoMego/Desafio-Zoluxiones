const Joi = require('joi');

class PeopleRequestParams {
  constructor(nombre, edad, genero) {
    this.nombre = nombre;
    this.edad = edad;
    this.genero = genero;
  }

  validate() {
    const schema = Joi.object().keys({
      nombre: Joi.string().required(),
      edad: Joi.number().integer().min(1).required(),
      genero: Joi.any().valid('M', 'F').required()
    });

    return schema.validate(this);
  }
}

module.exports = PeopleRequestParams;