'use strict';

const TABLE = 'users';
const COLUMN1 = 'description';
const COLUMN2 = 'socials';
const COLUMN3 = 'location';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn(TABLE, COLUMN1, {
      type: Sequelize.TEXT,
    });
    await queryInterface.addColumn(TABLE, COLUMN3, {
      type: Sequelize.TEXT,
    });
    await queryInterface.addColumn(TABLE, COLUMN2, {
      type: Sequelize.JSONB,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn(TABLE, COLUMN1);
    await queryInterface.removeColumn(TABLE, COLUMN2);
    await queryInterface.removeColumn(TABLE, COLUMN3);
  },
};
