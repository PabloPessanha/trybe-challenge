const { user: User, language: Language } = require('../models');
const { createUser } = require('../services/DeveloperServices');

class DeveloperController {
  async store(req, res) {
    try {
      const userData = await createUser(req.body);

      return res.status(200).json(userData);
    } catch ({ message }) {
      if (message) return res.status(400).json({ message });
      return res.status(500).json({ message: 'internal error' });
    }
  }

  async getById(req, res) {
    const user = await User.findOne({ 
      where: { id: req.params.id }, 
      include: [{ model: Language, as: 'languages' }],
      attributes: { exclude: ['id'] },
    });
    if (!user) return res.status(404).json({ message: 'User not found!' });
    const { languages, ...userInfo } = user.dataValues;

    const finalUser = { ...userInfo, skills: languages.map(({ language }) => language) };
    return res.status(200).json(finalUser);
  }
}

module.exports = new DeveloperController();