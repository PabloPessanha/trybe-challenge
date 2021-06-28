const validateFields = require('./validateFields');
const validateName = require('./validateName');
const validateTelphone = require('./validateTelphone');
const validateCelphone = require('./validateCelphone');
const validateSkills = require('./validateSkills');

module.exports = async (req, res) => {
  try {
    await validateFields(req.body);
    await validateName(req.body.name);
    await validateCelphone(req.body.celphone_number);
    await validateTelphone(req.body.telphone_number);
    await validateSkills(req.body.skills);
  } catch ({ message }) {
    return res.status(400).json({ message });
  }
};
