const { Router } = require('express');
const { User } = require('../models');

const developer = Router();

developer.post('/developer', async (req, res) => {
  const { name, telphone_number, celphone_number } = req.body;
  const user = await User.create({ name, telphone_number, celphone_number });

  return res.status(200).json(user);
});

module.exports = developer;