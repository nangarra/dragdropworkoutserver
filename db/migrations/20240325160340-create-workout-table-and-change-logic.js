'use strict';
const TABLE = 'workouts';

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
        title: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        description: { type: Sequelize.TEXT, allowNull: false },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        updatedAt: { type: Sequelize.DATE },
        deletedAt: { type: Sequelize.DATE },
      })
      .then(() =>
        queryInterface.addConstraint(TABLE, {
          fields: ['fkSelectedExerciseId'],
          type: 'foreign key',
          name: 'workouts_fk0',
          references: {
            table: 'selected_exercises',
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
