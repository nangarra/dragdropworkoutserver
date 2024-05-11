import {
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { Op, Transaction } from 'sequelize';
import { GlobalDbService } from '../global-db/global-db.service';
import * as _ from 'lodash';
import { DEFAULT_ROLES } from 'src/constants';

@Injectable()
export class RoleService {
  private logger = new Logger('RoleService');
  constructor(private readonly DB: GlobalDbService) {}

  saveRole = async (
    body: any,
    loggedInUser: any,
    transaction: Transaction = null,
  ) => {
    const { role, companyId } = body;

    if (!role.id) {
      const response = await this.DB.getOne('Role', { name: role.name });
      if (response) {
        throw new ConflictException('Role already exists!');
      }
    }

    const savedRole = await this.DB.save(
      'Role',
      role,
      loggedInUser,
      transaction,
    );

    if (!role.id) {
      const companyRole = {
        companyId,
        roleId: savedRole.id,
      };

      await this.DB.save('CompanyRole', companyRole, loggedInUser, transaction);
    }
    return { message: 'Role created!' };
  };

  getAll = async (params: any) => {
    const { repo } = this.DB;

    const companyWhere: any = { companyId: params.companyId };
    const where: any = {};

    if (params.roleId) {
      where.id = params.roleId;
    }

    const response = await repo.Role.findAndCountAll({
      where,
      distinct: true,
      subQuery: false,
      include: {
        model: repo.CompanyRole,
        where: companyWhere,
        attributes: [],
        required: true,
      },
      order: [['createdAt', 'desc']],
    });

    return response;
  };

  getOne = async (id: string) => {
    const role: any = await this.DB.repo.Role.findOne({
      where: { id },
    });
    if (!role) {
      throw new NotFoundException();
    }
    return { role };
  };

  delete = async (
    roleId: string,
    loggedInUser: any,
    transaction: Transaction = null,
  ) => {
    const user = await this.DB.getOne('User', { roleId });
    if (user) {
      throw new ConflictException('Role is assigned to a User!');
    }

    await this.DB.delete('CompanyRole', { roleId }, loggedInUser, transaction);
    await this.DB.delete('Role', { id: roleId }, loggedInUser, transaction);

    return { message: 'Role deleted!' };
  };

  getRolePermission = async (roleId: string, params: any) => {
    const { repo } = this.DB;
    const companyWhere: any = { companyId: params.companyId };
    const response = await repo.RolePermission.findAndCountAll({
      where: { roleId },
      attributes: ['permissionId'],
      include: [
        {
          model: repo.Permission,
          attributes: ['permission'],
        },
        {
          model: repo.Role,
          attributes: [],
          required: true,
          include: {
            model: repo.CompanyRole,
            where: companyWhere,
            attributes: [],
            required: true,
          },
        },
      ],
    });
    return response;
  };

  async saveRolePermissions(permissionsData: any, roleId: string) {
    try {
      const permissionIds = _.uniq(permissionsData.permissionIds);

      const validPermissions = await this.DB.getAll('Permission', {
        id: permissionIds,
      });
      if (validPermissions.rows.length !== permissionIds.length) {
        throw new Error('Invalid roles are passed.');
      }

      const rolePermissions = await this.DB.repo.RolePermission.findAll({
        where: { roleId },
        attributes: ['permissionId'],
      });

      const sentPermissions = permissionIds || [];

      const existingPermissions = [];
      _.map(rolePermissions, (v) => existingPermissions.push(v.permissionId));

      const addRoles = _.map(
        _.difference(sentPermissions, existingPermissions),
        (pId) => ({
          roleId,
          permissionId: pId,
        }),
      );

      const deleteRoles = _.map(
        _.difference(existingPermissions, sentPermissions),
        (pId) => ({
          roleId,
          permissionId: pId,
        }),
      );

      let permissionsToAdd = [];
      let permissionsToDelete = [];

      permissionsToAdd = [...permissionsToAdd, ...addRoles];
      permissionsToDelete = [...permissionsToDelete, ...deleteRoles];

      const addPromise =
        this.DB.repo.RolePermission.bulkCreate(permissionsToAdd);
      const deletePromise = this.DB.repo.RolePermission.destroy({
        where: {
          [Op.or]: permissionsToDelete,
        },
      });
      await Promise.all([addPromise, deletePromise]);
      return {
        message: 'Role Permissions set!',
        permissionsAdded: permissionsToAdd,
        permissionsDeleted: permissionsToDelete,
      };
    } catch (e) {
      this.logger.error('Error while creating Role-Permissions ', e);
    }
  }

  search = async (params: any) => {
    const { repo } = this.DB;
    const where: any = {};
    const companyWhere: any = {};

    if (params.search) {
      where.name = { [Op.iLike]: `%${params.search}%` };
    }

    if (params.companyId) {
      companyWhere.companyId = params.companyId;
    }

    const response = await repo.Role.findAll({
      where,
      include: {
        model: repo.CompanyRole,
        attributes: [],
        where: companyWhere,
        required: true,
      },
    });

    return response;
  };
}
