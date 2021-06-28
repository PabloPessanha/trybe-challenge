const Joi = require('joi');

module.exports = async function validateName(obj) {
  const validator = Joi.string().min(5).required();
  await validator.validateAsync(obj.name)
    .then()
    .catch(({ message }) => { throw new Error(message); });
};
