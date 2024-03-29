import { Injectable, Logger } from '@nestjs/common';
import { GlobalDbService } from '../global-db/global-db.service';
import _ from 'lodash';
import { Op, Sequelize } from 'sequelize';

@Injectable()
export class WorkoutService {
  private logger = new Logger('WorkoutService');
  constructor(private readonly DB: GlobalDbService) {}

  getAll = async (params: any) => {
    const { repo } = this.DB;
    const where: any = {};

    if (params.workoutId) {
      where.workoutId = params.workoutId;
    }
    return repo.Workout.findAll({
      attributes: [
        'createdAt',
        'deletedAt',
        'description',
        'id',
        'thumbnail',
        'title',
        'updatedAt',
        'workoutId',
        [Sequelize.col('SelectedWorkout.sequence'), 'sequence'],
      ],
      where,
      include: {
        model: repo.SelectedWorkout,
      },
      order: [['updatedAt', 'desc']],
    });
  };

  save = async (data: any, loggedInUser: any) => {
    try {
      return this.DB.save('Workout', data, loggedInUser);
    } catch (error) {
      throw { message: error.message };
    }
  };

  delete = async (id: string, loggedInUser: any) => {
    try {
      await this.DB.delete('SelectedWorkout', { workoutId: id }, loggedInUser);
      await this.DB.delete('Workout', { id }, loggedInUser);
      return { message: 'Workout Deleted!' };
    } catch (error) {
      throw { message: error.message };
    }
  };
}
