'use strict';

const TABLE = 'selected_exercises';
const FK_NUTRITION_ID = 'fkNutritionId';
const CONSTRAINT = 'selected_exercises_fkNutritionId_fkey';
const CALORIES = 'calories';
const PROTEIN = 'protein';
const FK_EXERCISE_ID = 'fkExerciseId';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn(TABLE, FK_EXERCISE_ID, {
      type: Sequelize.UUID,
      allowNull: true,
    });
    await queryInterface
      .addColumn(TABLE, FK_NUTRITION_ID, {
        type: Sequelize.UUID,
      })
      .then(() =>
        queryInterface.addConstraint(TABLE, {
          fields: [FK_NUTRITION_ID],
          type: 'foreign key',
          name: CONSTRAINT,
          references: {
            table: 'nutritions',
            field: 'id',
          },
          onDelete: 'cascade',
          onUpdate: 'cascade',
        }),
      );
    await queryInterface.addColumn(TABLE, CALORIES, {
      type: Sequelize.FLOAT,
    });
    await queryInterface.addColumn(TABLE, PROTEIN, {
      type: Sequelize.FLOAT,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint(TABLE, CONSTRAINT);
    await queryInterface.removeColumn(TABLE, FK_NUTRITION_ID);
    await queryInterface.removeColumn(TABLE, CALORIES);
    await queryInterface.removeColumn(TABLE, PROTEIN);
  },
};
