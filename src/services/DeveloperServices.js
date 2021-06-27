const Joi = require('joi');
const cepPromise = require('cep-promise');

class DeveloperServices {
  constructor(obj) {
    this.name = obj.name;
    this.telphone_number = obj.telphone_number?.toString();
    this.celphone_number = obj.celphone_number?.toString();
    this.cep = obj.cep?.toString();
    this.skills = obj.skills;

    this.validateName();
    this.validateTelephone();
    this.validateCelphone();
    this.validateCep();
  }

  async validateName() {
    const validator = Joi.string().min(5).required();
    await validator.validateAsync(this.name)
      .then()
      .catch(({ message }) => { throw new Error(message); });
  }

  async validateTelephone() {
    const validator = Joi.string().length(10).pattern(/^\d+$/);
    await validator.validateAsync(this.telphone_number)
      .then()
      .catch(({ message }) => { throw new Error(message); });
  }

  async validateCelphone() {
    const validator = Joi.string().length(11).pattern(/^\d+$/).required();
    await validator.validateAsync(this.celphone_number)
      .then()
      .catch(({ message }) => { throw new Error(message); });
  }

  async validateCep() {
    await cepPromise(this.cep)
      .then(console.log)
      .catch((_err) => { throw new Error('Cep inválido') });
  }
}

const teste = new DeveloperServices({ name: 'Pablo', celphone_number: 21985199407, cep: '03047000' });
console.log(teste);

// module.exports = new DeveloperServices();