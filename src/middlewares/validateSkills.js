const Joi = require('joi');

module.exports = async function validateSkills(obj) {
  const validSkills = ['Javascript', 'Java', 'Go', 'Python', 'C#', 'Elixir'];
  const validator = Joi.array().items(
    Joi.string().valid(...validSkills).insensitive().required(),
    Joi.string().valid(...validSkills).insensitive().required(),
);
  await validator.validateAsync(obj.skills)
    .then()
    .catch(({ message }) => { throw new Error(message); });
};
