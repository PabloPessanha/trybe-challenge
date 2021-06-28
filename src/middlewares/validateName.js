const Joi = require('joi');

module.exports = async function validateName(name) {
  const validator = Joi.string().min(5).required();
  await validator.validateAsync(name)
    .then()
    .catch(({ message }) => { throw new Error(message); });
};
