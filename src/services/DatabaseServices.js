const { user: User, language: Language, address: Address } = require('../models');

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

module.exports = {
  getUserById,
  getAllUsers,
};