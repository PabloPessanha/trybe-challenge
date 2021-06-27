const { User } = require('../models');

class DeveloperController {
  async store(req, res) {
    const { name, telphone_number, celphone_number } = req.body;
    const user = await User.create({ name, telphone_number, celphone_number });

    return res.status(200).json(user);
  }
}

module.exports = new DeveloperController();