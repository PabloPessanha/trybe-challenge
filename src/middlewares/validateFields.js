const Joi = require('joi');

module.exports = async function validateFields(obj) {
  const validator = Joi.object({ 
    name: Joi.required(), 
    celphone_number: Joi.required(), 
    skills: Joi.required(),
    cep: Joi.required(),
  });
  await validator.validateAsync(obj)
    .then()
    .catch(({ message }) => { throw new Error(message); });
};
