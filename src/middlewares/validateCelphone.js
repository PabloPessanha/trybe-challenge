const Joi = require('joi');

module.exports = async function validateCelphone(celphone_number) {
  const validator = Joi.string().length(11).pattern(/^\d+$/).required();
  await validator.validateAsync(celphone_number.toString())
    .then()
    .catch(({ message }) => { throw new Error(message); });
};
