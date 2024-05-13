'use strict';
const TABLE = 'assigned_workouts';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface
      .createTable(TABLE, {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.literal('uuid_generate_v4()'),
          primaryKey: true,
          allowNull: false,
        },
        fkWorkoutId: {
          type: Sequelize.UUID,
          allowNull: false,
        },
        fkClientId: {
          type: Sequelize.UUID,
          allowNull: false,
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        updatedAt: { type: Sequelize.DATE },
        deletedAt: { type: Sequelize.DATE },
      })
      .then(() =>
        queryInterface.addConstraint(TABLE, {
          fields: ['fkWorkoutId'],
          type: 'foreign key',
          references: {
            table: 'workouts',
            field: 'id',
          },
          onDelete: 'cascade',
          onUpdate: 'cascade',
        }),
      )
      .then(() =>
        queryInterface.addConstraint(TABLE, {
          fields: ['fkClientId'],
          type: 'foreign key',
          references: {
            table: 'users',
            field: 'id',
          },
          onDelete: 'cascade',
          onUpdate: 'cascade',
        }),
      );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable(TABLE);
  },
};
