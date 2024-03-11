import { Injectable, Logger } from '@nestjs/common';
import { GlobalDbService } from '../global-db/global-db.service';
import _ from 'lodash';
import { Op, Sequelize } from 'sequelize';

@Injectable()
export class ExerciseService {
  private logger = new Logger('ExerciseService');
  constructor(private readonly DB: GlobalDbService) {}

  getAll = async (params: any) => {
    const { repo } = this.DB;
    const where: any = {};

    if (params.workoutId) {
      where.workoutId = params.workoutId;
    }
    return repo.Exercise.findAll({
      attributes: [
        'createdAt',
        'deletedAt',
        'description',
        'id',
        'thumbnail',
        'title',
        'updatedAt',
        'workoutId',
        [Sequelize.col('SelectedExercise.sequence'), 'sequence'],
      ],
      where,
      include: {
        model: repo.SelectedExercise,
      },
      order: [['updatedAt', 'desc']],
    });
  };

  save = async (data: any, loggedInUser: any) => {
    try {
      return this.DB.save('Exercise', data, loggedInUser);
    } catch (error) {
      throw { message: error.message };
    }
  };

  delete = async (id: string, loggedInUser: any) => {
    try {
      await this.DB.delete(
        'SelectedExercise',
        { exerciseId: id },
        loggedInUser,
      );
      await this.DB.delete('Exercise', { id }, loggedInUser);
      return { message: 'Exercise Deleted!' };
    } catch (error) {
      throw { message: error.message };
    }
  };
}
