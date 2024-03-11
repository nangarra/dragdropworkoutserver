import { Injectable, Logger } from '@nestjs/common';
import { GlobalDbService } from '../global-db/global-db.service';
import { Op } from 'sequelize';
import * as _ from 'lodash';

@Injectable()
export class SelectedWorkoutService {
  private logger = new Logger('SelectedWorkoutService');
  constructor(private readonly DB: GlobalDbService) {}

  save = async (
    workoutId: string,
    selectedExercises: any,
    loggedInUser: any,
  ) => {
    const { repo } = this.DB;

    const exercises = await repo.Exercise.findAll({
      where: { workoutId },
      raw: true,
    });
    const exerciseIds = _.map(exercises, 'id');

    await repo.SelectedExercise.destroy({
      where: { exerciseId: { [Op.in]: exerciseIds } },
      force: true,
    });

    const promises = _.map(selectedExercises, async (exercise: any, index) => {
      const data = {
        exerciseId: exercise.id,
        sequence: index + 1,
      };
      await this.DB.save('SelectedExercise', data, loggedInUser);
    });

    await Promise.all(promises);

    return { message: 'Workout Plan Created!' };
  };
}
