const cepPromise = require('cep-promise');
const { user: User, address: Address } = require('../models');

async function getCepData(cep) {
  return cepPromise(cep)
    .then((address) => ({ 
      rua: address.street, 
      bairro: address.neighborhood, 
      cidade: address.city, 
      uf: address.state, 
      cep }))
    .catch((_err) => { throw new Error('Cep inválido'); });
}

async function createUser({ name, telphone_number = null, celphone_number, cep }) {
  const { rua, bairro, cidade, uf } = await getCepData(cep);

  const { id } = await User.create({ name, telphone_number, celphone_number });
  const { dataValues } = await Address.create({ user_id: id, rua, bairro, cidade, uf, cep });

  const { user_id, ...endereco } = dataValues;
  return {
    nome: name,
    telefone: telphone_number,
    celular: celphone_number,
    endereco,
  };
}

module.exports = {
  getCepData,
  createUser,
};
