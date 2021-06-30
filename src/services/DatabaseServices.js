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
  if (!user) { throw new Error('User not found!'); }

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
  const checkUserExists = User.findByPk(id);
  if (!checkUserExists) { throw new Error('User not found!'); }

  const address = await getCepData(cep);

  await Address.update(address, { where: { user_id: id } });
  await User.update({ name, telphone_number, celphone_number }, { where: { id } });

  await userLanguage.destroy({ where: { user_id: id } });
  await addUserSkills(skills, id);
}

async function deleteUser(id) {
  await User.destroy({ where: { id } });
}

module.exports = {
  getUserById,
  getAllUsers,
  updateUser,
  deleteUser,
};