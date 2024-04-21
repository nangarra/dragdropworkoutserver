import { ConflictException, Injectable, Logger } from '@nestjs/common';
import { GlobalDbService } from '../global-db/global-db.service';
import { Op, Sequelize, Transaction, UniqueConstraintError } from 'sequelize';
const _ = require('lodash');

@Injectable()
export class WorkoutService {
  private logger = new Logger('WorkoutService');
  constructor(private readonly DB: GlobalDbService) {}

  getAll = async (params: any) => {
    const { repo } = this.DB;
    const where: any = {};
    let sort: string = 'rating';
    let order: string = 'desc';

    if (params.workoutId) {
      where.workoutId = params.workoutId;
    }

    if (params.sort === 'popular') {
      sort = 'rating';
    }

    if (params.sort === 'recent') {
      sort = 'createdAt';
    }

    if (params.sort === 'old') {
      sort = 'createdAt';
      order = 'asc';
    }

    return repo.Workout.findAll({
      attributes: [
        'id',
        'title',
        'description',
        'createdAt',
        [
          Sequelize.cast(
            Sequelize.fn(
              'COALESCE',
              Sequelize.fn('avg', Sequelize.col('WorkoutRating.rating')),
              0,
            ),
            'INTEGER',
          ),
          'rating',
        ],
      ],
      where,
      include: [
        {
          model: repo.SelectedExercise,
          required: true,
          include: [
            {
              model: repo.Nutrition,
            },
            {
              model: repo.Exercise,
            },
          ],
        },
        {
          model: repo.WorkoutRating,
          attributes: [],
        },
      ],
      order: [[sort, order]],
      group: [
        'Workout.id',
        'SelectedExercise.id',
        'SelectedExercise->Nutrition.id',
        'SelectedExercise->Exercise.id',
      ],
    });
  };

  getOne = async (workout: string) => {
    function convertStringToSpacedWords(text) {
      return text.replace(/-/g, ' ');
    }

    const { repo } = this.DB;

    const title = convertStringToSpacedWords(workout);

    const response = await repo.Workout.findOne({
      where: { title: { [Op.iLike]: `%${title}%` } },
    });

    const where: any = { id: response.id };

    const res = await repo.Workout.findOne({
      attributes: [
        'id',
        'title',
        'description',
        'createdAt',
        [Sequelize.fn('avg', Sequelize.col('WorkoutRating.rating')), 'rating'],
        [
          Sequelize.fn('count', Sequelize.col('WorkoutRating.rating')),
          'ratingsCount',
        ],
      ],
      where,
      include: [
        {
          model: repo.SelectedExercise,
          required: true,
          include: [
            {
              model: repo.Nutrition,
            },
            {
              model: repo.Exercise,
            },
          ],
        },
        {
          model: repo.WorkoutRating,
          attributes: [],
        },
      ],
      group: [
        'Workout.id',
        'SelectedExercise.id',
        'SelectedExercise->Nutrition.id',
        'SelectedExercise->Exercise.id',
      ],
    });

    res.setDataValue(
      'SelectedExercise',
      _.orderBy(
        res.getDataValue('SelectedExercise'),
        [(row: any) => row?.sequence],
        ['asc'],
      ),
    );

    return res;
  };

  create = async (data: any, transaction: Transaction = null) => {
    try {
      const { repo } = this.DB;

      const { selected } = data;

      const workout = {
        title: data.title,
        description: data.description,
        createdAt: new Date(),
      };

      const existingWorkout = await repo.Workout.findOne({
        where: { title: { [Op.iLike]: `%${data.title}%` } },
      });

      if (existingWorkout) {
        throw new Error('501');
      }

      const createdWorkout = await repo.Workout.create(workout, {
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

        body.workoutId = createdWorkout.id;
        body.createdAt = new Date();
        body.sequence = index + 1;

        return body;
      });

      const response = await repo.SelectedExercise.bulkCreate(selectedItems, {
        transaction,
      });
      return createdWorkout;
    } catch (error) {
      throw { message: error.message };
    }
  };

  delete = async (id: string, loggedInUser: any) => {
    try {
      await this.DB.delete('Workout', { id }, loggedInUser);
      return { message: 'Workout Deleted!' };
    } catch (error) {
      throw { message: error.message };
    }
  };

  setRating = async (workoutId: string, rating: number) => {
    const { repo } = this.DB;
    const data = { workoutId, rating };
    await repo.WorkoutRating.create(data);
    return { message: 'Workout Rated!' };
  };
}
