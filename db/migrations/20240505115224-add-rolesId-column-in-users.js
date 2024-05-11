'use strict';

const TABLE = 'users';
const COLUMN = 'fkRoleId';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn(TABLE, COLUMN, {
      type: Sequelize.UUID,
      allowNull: true,
    });

    const selectQuery = `SELECT id FROM roles WHERE name = 'Super Admin'`;
    const [superAdminRole] = await queryInterface.sequelize.query(selectQuery, {
      type: Sequelize.QueryTypes.SELECT,
    });

    const updateQuery = `UPDATE ${TABLE} SET "fkRoleId" = '${superAdminRole.id}'`;
    await queryInterface.sequelize.query(updateQuery);

    await queryInterface.changeColumn(TABLE, COLUMN, {
      type: Sequelize.UUID,
      allowNull: false,
    });

    await queryInterface.addConstraint(TABLE, {
      fields: [COLUMN],
      type: 'foreign key',
      name: 'fk_users_role',
      references: {
        table: 'roles',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint(TABLE, 'fk_users_role');

    await queryInterface.changeColumn(TABLE, COLUMN, {
      type: Sequelize.UUID,
      allowNull: true,
    });

    await queryInterface.removeColumn(TABLE, COLUMN);
  },
};
