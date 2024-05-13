'use strict';

const TABLE = 'workouts';
const COLUMN = 'fkCreatedBy';
const CONSTRAINT = 'workouts_fkCreatedBy_fkey';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface
      .addColumn(TABLE, COLUMN, {
        type: Sequelize.UUID,
      })
      .then(() =>
        queryInterface.addConstraint(TABLE, {
          fields: ['fkCreatedBy'],
          type: 'foreign key',
          name: CONSTRAINT,
          references: {
            table: 'users',
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
