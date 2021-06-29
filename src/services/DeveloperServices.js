const cepPromise = require('cep-promise');
const { Op } = require('sequelize');
const { user: User, address: Address, language: Language, userLanguage } = require('../models');

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

async function addUserSkills(skills, user_id) {
  const languages = await Promise.all(skills.map(async (skill) => {
    const { dataValues } = await Language.findOne({ where: { language: { [Op.iLike]: skill } } });
    const { id: language_id, language } = dataValues;

    await userLanguage.create({ language_id, user_id });
    return language;
  }));

  return languages;
}

async function createUser({ name, telphone_number = null, celphone_number, cep, skills }) {
  const { rua, bairro, cidade, uf } = await getCepData(cep);

  const { id } = await User.create({ name, telphone_number, celphone_number });
  const { dataValues } = await Address.create({ user_id: id, rua, bairro, cidade, uf, cep });

  const { user_id, ...endereco } = dataValues;
  const especialidades = await addUserSkills(skills, user_id);
  return {
    nome: name,
    telefone: telphone_number,
    celular: celphone_number,
    endereco,
    especialidades,
  };
}

module.exports = {
  createUser,
  getCepData,
};
