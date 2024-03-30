'use strict';
const TABLE = 'workouts';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(TABLE, {
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
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable(TABLE);
  },
};
