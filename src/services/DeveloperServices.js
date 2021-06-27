const Joi = require('joi');

class DeveloperServices {
  constructor({ name, telphone_number, celphone_number, cep, skills }) {
    this.name = name;
    this.telphone_number = telphone_number;
    this.celphone_number = celphone_number;
    this.cep = cep;
    this.skills = skills;

    this.validateName();
  }

  async validateName() {
    try {
      const validator = Joi.string().min(5).required();
      validator.validateAsync(this.name);
    } catch (e) {
      throw new Error(e.message);
    }
  }
}

module.exports = new DeveloperServices();