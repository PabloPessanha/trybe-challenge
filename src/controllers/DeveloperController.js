const formatUserResponse = require('../helpers/formatUserResponse');
const { createUser } = require('../services/DeveloperServices');
const DatabaseServices = require('../services/DatabaseServices');

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
    const user = await DatabaseServices.getUserById(req.params.id);

    if (!user) return res.status(404).json({ message: 'User not found!' });
    const finalUser = formatUserResponse(user.dataValues);

    return res.status(200).json(finalUser);
  }

  async getAllUsers(_req, res) {
    const users = await DatabaseServices.getAllUsers();
    const finalUsers = users.map(({ dataValues }) => formatUserResponse(dataValues));

    return res.status(200).json(finalUsers);
  }
}

module.exports = new DeveloperController();