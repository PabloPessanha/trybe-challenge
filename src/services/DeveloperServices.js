const cepPromise = require('cep-promise');

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

module.exports = {
  getCepData,
};
