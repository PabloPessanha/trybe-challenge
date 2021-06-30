const { user: User, language: Language, address: Address, userLanguage } = require('../models');
const { getCepData, addUserSkills } = require('./DeveloperServices');

async function getUserById(id) {
  const user = await User.findOne({ 
    where: { id }, 
    include: [
      { model: Language, as: 'languages' }, 
      { model: Address, as: 'address', attributes: { exclude: ['user_id'] } },
    ],
    attributes: { exclude: ['id'] },
  });

  return user;
}

async function getAllUsers() {
  const users = await User.findAll({
    include: [
      { model: Language, as: 'languages' },
      { model: Address, as: 'address', attributes: { exclude: ['user_id'] } },
    ],
    attributes: { exclude: ['id'] },
  });

  return users;
}

async function updateUser(id, { name, telphone_number, celphone_number, cep, skills }) {
  const address = await getCepData(cep);

  const newAddress = await Address.update(address, { where: { id } });
  const user = await User.update({ name, telphone_number, celphone_number }, { where: { id } });

  await userLanguage.destroy({ where: { id } });
  const languages = await addUserSkills(skills, id);

  return { ...user, address: newAddress, languages };
}

module.exports = {
  getUserById,
  getAllUsers,
  updateUser,
};