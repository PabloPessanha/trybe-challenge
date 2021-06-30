const formatUserResponse = require('../helpers/formatUserResponse');
const { createUser } = require('../services/DeveloperServices');
const DatabaseServices = require('../services/DatabaseServices');

class DeveloperController {
  async store(req, res) {
    try {
      const userData = await createUser(req.body);

      return res.status(200).json(userData);
    } catch ({ message }) {
      return res.status(400).json({ message });
    }
  }

  async getById(req, res) {
    try {
      const user = await DatabaseServices.getUserById(req.params.id);

      const finalUser = formatUserResponse(user.dataValues);
      return res.status(200).json(finalUser);
    } catch ({ message }) {
      return res.status(404).json({ message });
    }
  }

  async getAllUsers(_req, res) {
    const users = await DatabaseServices.getAllUsers();
    const finalUsers = users.map(({ dataValues }) => formatUserResponse(dataValues));

    return res.status(200).json(finalUsers);
  }

  async delete(req, res) {
    try {
      await DatabaseServices.getUserById(req.params.id);

      await DatabaseServices.deleteUser(req.params.id);
      return res.status(204).end();
    } catch ({ message }) {
      return res.status(404).json({ message });
    }
  }
}

module.exports = new DeveloperController();