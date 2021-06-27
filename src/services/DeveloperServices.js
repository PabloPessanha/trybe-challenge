const Joi = require('joi');
const cepPromise = require('cep-promise');

module.exports = (obj) =>  {
  async function validateFields() {
    const validator = Joi.object({ 
      name: Joi.required(), 
      celphone_number: Joi.required(), 
      cep: Joi.required(),
      skills: Joi.required()
    });
    await validator.validateAsync(this.obj)
      .then()
      .catch(({ message }) => { throw new Error(message); });
  }

  async function validateName() {
    const validator = Joi.string().min(5).required();
    await validator.validateAsync(this.name)
      .then()
      .catch(({ message }) => { throw new Error(message); });
  }

  async function validateTelephone() {
    const validator = Joi.string().length(10).pattern(/^\d+$/);
    await validator.validateAsync(this.telphone_number)
      .then()
      .catch(({ message }) => { throw new Error(message); });
  }

  async function validateCelphone() {
    const validator = Joi.string().length(11).pattern(/^\d+$/).required();
    await validator.validateAsync(this.celphone_number)
      .then()
      .catch(({ message }) => { throw new Error(message); });
  }

  async function validateCep() {
    await cepPromise(this.cep)
      .then((adress) => this.adress = adress)
      .catch((_err) => { throw new Error('Cep inválido') });
  }
};