module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('addresses', { 
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      rua: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      bairro: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      cidade: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      uf: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      cep: {
        type: Sequelize.STRING,
        allowNull: false,
      },
     });
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable('addresses');
  },
};
