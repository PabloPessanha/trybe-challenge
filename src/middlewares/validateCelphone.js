const Joi = require('joi');

module.exports = async function validateCelphone(obj) {
  const validator = Joi.string().length(11).pattern(/^\d+$/).required();
  await validator.validateAsync(obj.celphone_number?.toString())
    .then()
    .catch(({ message }) => { throw new Error(message); });
};
