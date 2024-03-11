const bcrypt = require('bcryptjs');
const dayjs = require('dayjs');
const _ = require('lodash');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    console.log('');
    console.log('------------------- SUPER ADMIN');
    console.log('');
    const salt = await bcrypt.genSalt();
    const password = await bcrypt.hash('temp', salt);

    const data = [
      {
        username: 'superadmin',
        password,
        email: 'super@temp.com',
        createdAt: dayjs().toDate(),
        salt,
      },
    ];

    const saveUser = await queryInterface.bulkInsert('users', data, {
      returning: true,
    });

    const superUserData = [
      { fkUserId: _.first(saveUser).id, createdAt: dayjs().toDate() },
    ];

    await queryInterface.bulkInsert('super_user', superUserData);
  },

  down: async (queryInterface, Sequelize) => {
    console.log('delete user');
  },
};
