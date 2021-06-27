const Joi = require('joi');

class DeveloperServices {
  constructor(obj) {
    this.name = obj.name;
    this.telphone_number = obj.telphone_number;
    this.celphone_number = obj.celphone_number;
    this.cep = obj.cep;
    this.skills = obj.skills;

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

  async validateCelphone() {
    const validator = Joi.string().length(11).pattern(/^\d+$/).required();
    await validator.validateAsync(this.celphone_number.toString())
      .then()
      .catch(({ message }) => { throw new Error(message); });
  }
}

module.exports = new DeveloperServices();