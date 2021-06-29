const formatUserResponse = require('../helpers/formatUserResponse');
const { user: User, language: Language, address: Address } = require('../models');
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
      include: [
        { model: Language, as: 'languages' }, 
        { model: Address, as: 'address', attributes: { exclude: ['user_id'] } },
      ],
      attributes: { exclude: ['id'] },
    });
    if (!user) return res.status(404).json({ message: 'User not found!' });
    const finalUser = formatUserResponse(user.dataValues);

    return res.status(200).json(finalUser);
  }

  async getAllUsers(_req, res) {
    const users = await User.findAll({
      include: [
        { model: Language, as: 'languages' },
        { model: Address, as: 'address', attributes: { exclude: ['user_id'] } },
      ],
      attributes: { exclude: ['id'] },
    });
    if (!users) return res.status(404).json({ message: 'No users found' });
    const finalUsers = users.map(({ dataValues }) => formatUserResponse(dataValues));

    return res.status(400).json(finalUsers);
  }
}

module.exports = new DeveloperController();