'use strict';

const WORKOUTS = 'workouts';
const NUTRITIONS = 'nutritions';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const droptable = queryInterface.dropTable(WORKOUTS);
    const createNutritionTable = queryInterface.createTable(NUTRITIONS, {
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
      description: { type: Sequelize.TEXT },
      thumbnail: { type: Sequelize.TEXT },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
      },
      deletedAt: { type: Sequelize.DATE },
    });

    await Promise.all([droptable, createNutritionTable]);
  },

  async down(queryInterface, Sequelize) {
    const droptable = queryInterface.dropTable(NUTRITIONS);
    const createWorkoutsTable = queryInterface.createTable(WORKOUTS, {
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
      description: { type: Sequelize.TEXT },
      thumbnail: { type: Sequelize.TEXT },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
      },
      deletedAt: { type: Sequelize.DATE },
    });
    await Promise.all([droptable, createWorkoutsTable]);
  },
};
