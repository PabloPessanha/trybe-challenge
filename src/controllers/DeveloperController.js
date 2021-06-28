const { Op } = require('sequelize');
const { language: Language } = require('../models');
const { createUser } = require('../services/DeveloperServices');

class DeveloperController {
  async store(req, res) {
    try {
      const userData = await createUser(req.body);

      const languagesId = await Promise.all(req.body.skills.map(async (skill) => {
        const { dataValues: { language } } = await Language.findOne({ where: { language: { [Op.iLike]: skill } } });
        return language;
      }));

      return res.status(200).json({ ...userData, languagesId });
    } catch ({ message }) {
      if (message) return res.status(400).json({ message });
      return res.status(500).json({ message: 'internal error' });
    }
  }
}

module.exports = new DeveloperController();