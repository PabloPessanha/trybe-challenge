const Joi = require('joi');
const cepPromise = require('cep-promise');

async function DeveloperServices(obj) {
  async function validateFields() {
    const validator = Joi.object({ 
      name: Joi.required(), 
      celphone_number: Joi.required(), 
      skills: Joi.required(),
      cep: Joi.required(),
    });
    await validator.validateAsync(obj)
      .then()
      .catch(({ message }) => { throw new Error(message); });
  }

  async function validateName() {
    const validator = Joi.string().min(5).required();
    await validator.validateAsync(obj.name)
      .then()
      .catch(({ message }) => { throw new Error(message); });
  }

  async function validateTelephone() {
    const validator = Joi.string().length(10).pattern(/^\d+$/);
    await validator.validateAsync(obj.telphone_number?.toString())
      .then()
      .catch(({ message }) => { throw new Error(message); });
  }

  async function validateCelphone() {
    const validator = Joi.string().length(11).pattern(/^\d+$/).required();
    await validator.validateAsync(obj.celphone_number?.toString())
      .then()
      .catch(({ message }) => { throw new Error(message); });
  }

  async function validateCep() {
    return await cepPromise(obj.cep)
      .then((adress) => adress)
      .catch((_err) => { throw new Error('Cep inválido') });
  }

  async function validateSkills() {
    const validSkills = ['Javascript', 'Java', 'Go', 'Python', 'C#', 'Elixir']
    const validator = Joi.array().items(
      Joi.string().valid(...validSkills).insensitive().required(),
      Joi.string().valid(...validSkills).insensitive().required())
    await validator.validateAsync(obj.skills)
      .then()
      .catch(({ message }) => { throw new Error(message); })
  }

  await validateFields();
  await validateName();
  await validateTelephone();
  await validateCelphone();
  await validateSkills();
  return await validateCep();
};

module.exports = DeveloperServices;
