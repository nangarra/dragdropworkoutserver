'use strict';

const TABLE = 'exercises';
const COLUMN = 'fkWorkoutId';
const CONSTRAINT = 'exercises_fkWorkoutId_fkey';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeConstraint(TABLE, CONSTRAINT);
    await queryInterface.removeColumn(TABLE, COLUMN);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn(TABLE, COLUMN, {
      type: Sequelize.UUID,
      allowNull: false,
    });
    await queryInterface.addConstraint(TABLE, CONSTRAINT);
    await queryInterface.addConstraint(TABLE, {
      fields: [COLUMN],
      type: 'foreign key',
      name: CONSTRAINT,
      references: {
        table: 'workouts',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
  },
};
