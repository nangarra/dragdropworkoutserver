const dayjs = require('dayjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const data = [
      {
        name: 'Super Admin',
        createdAt: dayjs().toDate(),
      },
      {
        name: 'Personal Trainer',
        createdAt: dayjs().toDate(),
      },
      {
        name: 'Client',
        createdAt: dayjs().toDate(),
      },
    ];

    await queryInterface.bulkInsert('roles', data);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.truncateTable('roles');
  },
};
