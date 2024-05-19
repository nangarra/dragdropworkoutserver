'use strict';
const TABLE = 'personal_trainer_clients';

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
        fkTrainerId: {
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
          fields: ['fkTrainerId'],
          type: 'foreign key',
          references: {
            table: 'users',
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
