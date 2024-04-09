'use strict';

const TABLE = 'selected_exercises';

const WEIGHT = 'weight';
const FAT = 'fat';
const PCS = 'pcs';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn(TABLE, WEIGHT, {
      type: Sequelize.INTEGER,
    });
    await queryInterface.addColumn(TABLE, FAT, {
      type: Sequelize.INTEGER,
    });
    await queryInterface.addColumn(TABLE, PCS, {
      type: Sequelize.INTEGER,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn(TABLE, WEIGHT);
    await queryInterface.removeColumn(TABLE, FAT);
    await queryInterface.removeColumn(TABLE, PCS);
  },
};
