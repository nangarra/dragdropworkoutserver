'use strict';

const TABLE = 'exercises';
const COLUMN = 'discipline';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn(TABLE, COLUMN, {
      type: Sequelize.TEXT,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn(TABLE, COLUMN);
  },
};
