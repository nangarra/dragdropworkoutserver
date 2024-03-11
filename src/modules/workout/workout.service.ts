import { Injectable, Logger } from '@nestjs/common';
import { GlobalDbService } from '../global-db/global-db.service';

@Injectable()
export class WorkoutService {
  private logger = new Logger('WorkoutService');
  constructor(private readonly DB: GlobalDbService) {}

  getAll = async (params: any) => {
    const { repo } = this.DB;
    return repo.Workout.findAll({
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
      await this.DB.delete('Workout', { id }, loggedInUser);
      return { message: 'Workout Deleted!' };
    } catch (error) {
      throw { message: error.message };
    }
  };
}
