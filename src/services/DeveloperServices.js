const Joi = require('joi');

class DeveloperServices {
  constructor({ name, telphone_number, celphone_number, cep, skills }) {
    this.name = name;
    this.telphone_number = telphone_number;
    this.celphone_number = celphone_number;
    this.cep = cep;
    this.skills = skills;

    this.validateName();
    this.validateTelephone();
  }

  async validateName() {
    const validator = Joi.string().min(5).required();
    await validator.validateAsync(this.name)
      .then()
      .catch(({ message }) => { throw new Error(message); });
  }

  async validateTelephone() {
    const validator = Joi.string().length(10).pattern(/^\d+$/).required();
    await validator.validateAsync(this.telphone_number.toString())
      .then()
      .catch(({ message }) => { throw new Error(message); });
  }
}

module.exports = new DeveloperServices();