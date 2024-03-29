'use strict';
const TABLE = 'selected_exercises';
const COLUMN = 'fkWorkoutId';
const CONSTRAINT = 'selected_exercises_fkWorkoutId_fkey';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(
      'TRUNCATE TABLE selected_exercises CASCADE;',
    );
    await queryInterface
      .addColumn(TABLE, COLUMN, {
        type: Sequelize.UUID,
        allowNull: false,
      })
      .then(() =>
        queryInterface.addConstraint(TABLE, {
          fields: ['fkWorkoutId'],
          type: 'foreign key',
          name: CONSTRAINT,
          references: {
            table: 'selected_exercises',
            field: 'id',
          },
          onDelete: 'cascade',
          onUpdate: 'cascade',
        }),
      );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint(TABLE, CONSTRAINT);
    await queryInterface.removeColumn(TABLE, COLUMN);
  },
};
