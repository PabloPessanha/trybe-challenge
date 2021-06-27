module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert('languages', [
      {
        id: 1,
        language: 'Java',
      },
      {
        id: 2,
        language: 'Python',
      },
      {
        id: 3,
        language: 'Javascript',
      },
      {
        id: 4,
        language: 'Go',
      },
      {
        id: 5,
        language: 'C#',
      },
      {
        id: 6,
        language: 'Elixir',
      },
    ], { timestamps: false });
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('languages', null, {});
  },
};
