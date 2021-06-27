// const { User } = require('../models');
const DeveloperServices = require('../services/DeveloperServices');

class DeveloperController {
  async store(req, res) {
    try {
      const adress = await DeveloperServices(req.body);
      const user = { ...req.body, adress };

      return res.status(200).json(user);
    } catch ({ message }) {
      if (message) return res.status(400).json({ message });
      return res.status(500).json({ message: 'internal error' });
    }
  }
}

module.exports = new DeveloperController();