module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('languages', { 
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      language: {
        type: Sequelize.STRING,
        allowNull: false,
      },
     });
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable('languages');
  },
};
