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

  delete = async (clientId: string, loggedInUser: any) => {
    try {
      const { id: trainerId } = loggedInUser.user;

      await this.DB.delete(
        'PersonalTrainerClient',
        { clientId, trainerId },
        loggedInUser,
      );

      const response = await this.DB.repo.Workout.findAll({
        where: { createdBy: trainerId },
        raw: true,
      });

      await this.DB.delete(
        'AssignedWorkout',
        { clientId, workoutId: { [Op.in]: _.map(response, 'id') } },
        loggedInUser,
      );

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
