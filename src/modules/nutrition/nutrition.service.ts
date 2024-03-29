import { Injectable, Logger } from '@nestjs/common';
import { GlobalDbService } from '../global-db/global-db.service';

@Injectable()
export class NutritionService {
  private logger = new Logger('NutritionService');
  constructor(private readonly DB: GlobalDbService) {}

  getAll = async (params: any) => {
    const { repo } = this.DB;
    return repo.Nutrition.findAll({
      order: [['updatedAt', 'desc']],
    });
  };

  save = async (data: any, loggedInUser: any) => {
    try {
      return this.DB.save('Nutrition', data, loggedInUser);
    } catch (error) {
      throw { message: error.message };
    }
  };

  delete = async (id: string, loggedInUser: any) => {
    try {
      await this.DB.delete('Nutrition', { id }, loggedInUser);
      return { message: 'Nutrition Deleted!' };
    } catch (error) {
      throw { message: error.message };
    }
  };
}
