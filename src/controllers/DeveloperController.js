const { Op } = require('sequelize');
const { user: User, address: Address, language: Language } = require('../models');
const { getCepData } = require('../services/DeveloperServices');

class DeveloperController {
  async store(req, res) {
    try {
      const { rua, bairro, cidade, uf, cep } = await getCepData(req.body.cep);
      const { name, telphone_number = null, celphone_number, skills } = req.body;

      const { id, dataValues } = await User.create({ name, telphone_number, celphone_number });
      const { dataValues: { user_id, ...endereco } } = await Address.create({ user_id: id, rua, bairro, cidade, uf, cep });

      const languagesId = await Promise.all(skills.map(async (skill) => {
        const lang = await Language.findOne({ where: { language: { [Op.iLike]: skill } } });
        return lang;
      }));

      return res.status(200).json({ ...dataValues, endereco, languagesId });
    } catch ({ message }) {
      if (message) return res.status(400).json({ message });
      return res.status(500).json({ message: 'internal error' });
    }
  }
}

module.exports = new DeveloperController();