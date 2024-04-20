'use strict';

const TABLE = 'selected_exercises';
const COLUMN1 = 'fat';
const COLUMN2 = 'pcs';
const COLUMN3 = 'grams';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn(TABLE, COLUMN1, {
      type: Sequelize.FLOAT,
    });
    await queryInterface.changeColumn(TABLE, COLUMN2, {
      type: Sequelize.FLOAT,
    });
    await queryInterface.addColumn(TABLE, COLUMN3, {
      type: Sequelize.FLOAT,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn(TABLE, COLUMN1, {
      type: Sequelize.INTEGER,
    });
    await queryInterface.changeColumn(TABLE, COLUMN2, {
      type: Sequelize.INTEGER,
    });
    await queryInterface.removeColumn(TABLE, COLUMN3);
  },
};
