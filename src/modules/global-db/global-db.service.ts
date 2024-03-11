import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { REPOSITORIES } from 'src/constants/repositories';
import { UNIQUE_KEY_VIOLATION } from 'src/constants';
import { LoginToken } from '../auth/entities/login-token.entity';
import { SuperUser } from '../user/entities/super-user.entity';
import { User } from '../user/entities/user.entity';
import { Workout } from '../workout/entities/workout.entity';
import { Exercise } from '../exercise/entities/exercise.entity';
import { SelectedExercise } from '../selected-workouts/entities/selected-exercise.entity';

@Injectable()
export class GlobalDbService {
  private logger = new Logger('GlobalDbService');
  public repo: any = {};
  constructor(
    @Inject(REPOSITORIES.USER_REPOSITORY)
    private readonly userRepository: typeof User,
    @Inject(REPOSITORIES.LOGIN_TOKEN_REPOSITORY)
    private readonly loginTokenRepository: typeof LoginToken,
    @Inject(REPOSITORIES.SUPER_USER_REPOSITORY)
    private readonly superUserRepository: typeof SuperUser,
    @Inject(REPOSITORIES.WORKOUT_REPOSITORY)
    private readonly workoutRepo: typeof Workout,
    @Inject(REPOSITORIES.EXERCISE_REPOSITORY)
    private readonly exerciseRepo: typeof Exercise,
    @Inject(REPOSITORIES.SELECTED_EXERCISE_REPOSITORY)
    private readonly selectedExercise: typeof SelectedExercise,
  ) {
    this.repo['User'] = this.userRepository;
    this.repo['LoginToken'] = this.loginTokenRepository;
    this.repo['SuperUser'] = this.superUserRepository;
    this.repo['Workout'] = this.workoutRepo;
    this.repo['Exercise'] = this.exerciseRepo;
    this.repo['SelectedExercise'] = this.selectedExercise;
  }

  async getOne(model: string, params: any) {
    const filter = params;
    const result = await this.repo[model].findOne({ where: filter });
    return result;
  }

  async getAll(model: string, params: any) {
    const filter = params;
    return await this.repo[model].findAndCountAll({ where: filter });
  }

  async save(model: string, dto: any, loggedInUser: any, transaction = null) {
    if (transaction) {
      try {
        const { id } = dto;
        if (id) {
          // Update
          dto.updatedBy = loggedInUser.user.id;
          await this.repo[model].update(dto, {
            where: { id },
            transaction,
          });
          return await this.repo[model].findOne({ where: { id } });
        } else {
          // Create
          dto.createdBy = loggedInUser.user.id;
          return await this.repo[model].create(dto, { transaction });
        }
      } catch (e) {
        this.logger.error('Error while saving ', e);
        if (e.parent.code === UNIQUE_KEY_VIOLATION) {
          throw e;
        } else {
          throw new InternalServerErrorException();
        }
      }
    } else {
      try {
        const { id } = dto;
        if (id) {
          // Update
          dto.updatedBy = loggedInUser.user.id;
          await this.repo[model].update(dto, {
            where: { id },
          });
          return await this.repo[model].findOne({ where: { id } });
        } else {
          // Create
          dto.createdBy = loggedInUser.user.id;
          return await this.repo[model].create(dto);
        }
      } catch (e) {
        this.logger.error('Error while saving ', e);
        if (e.parent.code === UNIQUE_KEY_VIOLATION) {
          throw e;
        } else {
          throw new InternalServerErrorException();
        }
      }
    }
  }

  async delete(
    model: string,
    filter: any,
    loggedInUser: any = false,
    transaction = null,
  ) {
    if (transaction) {
      try {
        if (loggedInUser) {
          this.repo[model].destroy({ where: filter, transaction });
          const dto = {
            updatedBy: loggedInUser.user.id,
          };
          await this.repo[model].update(dto, { where: filter, transaction });
        }
        return await this.repo[model].destroy({ where: filter, transaction });
      } catch (e) {
        this.logger.error('Error while deleting ', e);
        throw new InternalServerErrorException();
      }
    } else {
      try {
        if (loggedInUser) {
          this.repo[model].destroy({ where: filter });
          const dto = {
            updatedBy: loggedInUser.user.id,
          };
          await this.repo[model].update(dto, { where: filter });
        }
        return await this.repo[model].destroy({ where: filter });
      } catch (e) {
        this.logger.error('Error while deleting ', e);
        throw new InternalServerErrorException();
      }
    }
  }
}
