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
}

module.exports = new DeveloperController();