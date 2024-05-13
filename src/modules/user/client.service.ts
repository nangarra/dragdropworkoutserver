import { Injectable, Logger } from '@nestjs/common';
import { GlobalDbService } from '../global-db/global-db.service';
import { Op, Sequelize, Transaction } from 'sequelize';
const _ = require('lodash');

@Injectable()
export class ClientService {
  private logger = new Logger('ClientService');
  constructor(private readonly DB: GlobalDbService) {}

  getAll = async (params: any) => {
    const { repo } = this.DB;
    const where: any = {};
    const clientWhere: any = {};
    let clientRequired: boolean = false;

    if (params.trainerId) {
      clientWhere.trainerId = params.trainerId;
      clientRequired = true;
    }

    return repo.User.findAll({
      where,
      include: [
        {
          model: repo.Role,
          where: { name: 'Client' },
          required: true,
          attributes: [],
        },
        {
          model: repo.PersonalTrainerClient,
          as: 'Client',
          where: clientWhere,
          required: clientRequired,
          attributes: [],
        },
        {
          model: repo.AssignedWorkout,
          include: {
            model: repo.Workout,
          },
        },
      ],
    });
  };

  getOne = async (clientId: string) => {
    const { repo } = this.DB;
    const where: any = { id: clientId };

    return repo.User.findOne({
      where,
      include: {
        model: repo.Role,
        where: { name: 'Client' },
        required: true,
      },
    });
  };

  create = async (data: any, transaction: Transaction = null) => {
    try {
      const { repo } = this.DB;

      const { selected } = data;

      const client: any = {
        title: data.title,
        description: data.description,
      };

      if (data.createdBy) {
        client.createdBy = data.createdBy;
      }

      if (!data.id) {
        const existingClient = await repo.Client.findOne({
          where: { title: { [Op.iLike]: `%${data.title}%` } },
        });

        if (existingClient) {
          throw new Error('501');
        }
      }

      // -------------------------------  Update Client --------------------------------- //

      if (data.id) {
        const updatedClient = await repo.Client.update(
          client,
          { where: { id: data.id } },
          {
            transaction,
          },
        );

        await repo.SelectedExercise.destroy({
          where: { clientId: data.id },
          force: true,
        });

        const selectedItems = _.map(selected, (row: any, index: number) => {
          const body = _.cloneDeep(row);
          if (body.type === 'exercises') {
            body.exerciseId = body.id;
          }
          if (body.type === 'nutritions') {
            body.nutritionId = body.id;
          }
          delete body.id;
          delete body.title;
          delete body.description;
          delete body.updatedAt;
          delete body.thumbnail;

          body.clientId = data.id;
          body.createdAt = new Date();
          body.sequence = index + 1;

          return body;
        });

        const response = await repo.SelectedExercise.bulkCreate(selectedItems, {
          transaction,
        });
        return repo.Client.findOne({ where: { id: data.id } });
      }

      // -------------------------------  Creating Client --------------------------------- //

      client.createdAt = new Date();
      const createdClient = await repo.Client.create(client, {
        transaction,
      });

      const selectedItems = _.map(selected, (row: any, index: number) => {
        const body = _.cloneDeep(row);
        if (body.type === 'exercises') {
          body.exerciseId = body.id;
        }
        if (body.type === 'nutritions') {
          body.nutritionId = body.id;
        }
        delete body.id;
        delete body.title;
        delete body.description;
        delete body.updatedAt;
        delete body.thumbnail;

        body.clientId = createdClient.id;
        body.createdAt = new Date();
        body.sequence = index + 1;

        return body;
      });

      const response = await repo.SelectedExercise.bulkCreate(selectedItems, {
        transaction,
      });
      return createdClient;
    } catch (error) {
      throw { message: error.message };
    }
  };

  delete = async (id: string, loggedInUser: any) => {
    try {
      await this.DB.delete('Client', { id }, loggedInUser);
      return { message: 'Client Deleted!' };
    } catch (error) {
      throw { message: error.message };
    }
  };

  setRating = async (clientId: string, rating: number) => {
    const { repo } = this.DB;
    const data = { clientId, rating };
    await repo.ClientRating.create(data);
    return { message: 'Client Rated!' };
  };
}
