('use strict');

const { Op } = require('sequelize');

const TABLE = 'workouts';
const COLUMN = 'title';
const CONSTRAINT = 'title_unique';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addIndex(TABLE, [COLUMN], {
      name: CONSTRAINT,
      unique: true,
      where: { deletedAt: { [Op.eq]: null } },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex(TABLE, CONSTRAINT);
  },
};
