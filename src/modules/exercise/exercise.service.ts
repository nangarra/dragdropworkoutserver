import { Injectable, Logger } from '@nestjs/common';
import { GlobalDbService } from '../global-db/global-db.service';
import { Op, Sequelize } from 'sequelize';
const _ = require('lodash');

@Injectable()
export class ExerciseService {
  private logger = new Logger('ExerciseService');
  constructor(private readonly DB: GlobalDbService) {}

  getAll = async (params: any) => {
    const { repo } = this.DB;
    const where: any = {};

    // if (params.discipline) {
    //   const disciplines = params.discipline.split(',');
    //   where[Op.or] = _.map(disciplines, (row) => ({
    //     discipline: { [Op.contains]: [row] },
    //   }));
    // }

    if (params.search) {
      where[Op.or] = [
        { title: { [Op.iLike]: `%${params.search}%` } },
        Sequelize.literal(
          `EXISTS (SELECT 1 FROM jsonb_array_elements_text(discipline) elem WHERE LOWER(elem) ILIKE '%${params.search}%')`,
        ),
      ];
    }

    return repo.Exercise.findAll({
      where,
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
