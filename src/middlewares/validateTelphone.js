const Joi = require('joi');

module.exports = async function validateTelephone(telphone_number) {
  const validator = Joi.string().length(10).pattern(/^\d+$/);
  await validator.validateAsync(telphone_number?.toString())
    .then()
    .catch(({ message }) => { throw new Error(message); });
};
