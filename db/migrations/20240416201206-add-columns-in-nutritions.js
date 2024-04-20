'use strict';

const TABLE = 'nutritions';
const COLUMN1 = 'type';
const COLUMN2 = 'calories';
const COLUMN3 = 'fat';
const COLUMN4 = 'protein';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn(TABLE, COLUMN1, {
      type: Sequelize.TEXT,
      defaultValue: 'perUnit',
      allowNull: false,
    });
    await queryInterface.addColumn(TABLE, COLUMN2, {
      type: Sequelize.INTEGER,
    });
    await queryInterface.addColumn(TABLE, COLUMN3, {
      type: Sequelize.INTEGER,
    });
    await queryInterface.addColumn(TABLE, COLUMN4, {
      type: Sequelize.INTEGER,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn(TABLE, COLUMN1);
    await queryInterface.removeColumn(TABLE, COLUMN2);
    await queryInterface.removeColumn(TABLE, COLUMN3);
    await queryInterface.removeColumn(TABLE, COLUMN4);
  },
};
