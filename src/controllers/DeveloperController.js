const { Op } = require('sequelize');
const { User, Address, Language } = require('../models');
const DeveloperServices = require('../services/DeveloperServices');

class DeveloperController {
  async store(req, res) {
    try {
      const { rua, bairro, cidade, uf, cep } = await DeveloperServices(req.body);
      const { name, telphone_number = null, celphone_number, languages } = req.body;

      const { id, ...userInfos } = await User.create({ name, telphone_number, celphone_number });
      const endereco = await Address.create({ id, rua, bairro, cidade, uf, cep });

      const languagesId = await Promise.all(languages.map(async (skill) => {
        const { id: languageId } = Language.findOne({ where: { language: { [Op.like]: skill } } });
        return languageId;
      }));

      return res.status(200).json({ ...userInfos, endereco, languages, languagesId });
    } catch ({ message }) {
      if (message) return res.status(400).json({ message });
      return res.status(500).json({ message: 'internal error' });
    }
  }
}

module.exports = new DeveloperController();