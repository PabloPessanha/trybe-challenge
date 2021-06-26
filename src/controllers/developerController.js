const { Router } = require('express');

const developer = Router();

developer.post('/developer', async (req, res) => {
  const { name, landline, phone, CEP, skills } = req.body;

  return res.status(200).json();
});

module.exports = developer;