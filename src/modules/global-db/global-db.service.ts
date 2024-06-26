import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { UNIQUE_KEY_VIOLATION } from 'src/constants';
import { REPOSITORIES } from 'src/constants/repositories';
import { LoginToken } from '../auth/entities/login-token.entity';
import { Exercise } from '../exercise/entities/exercise.entity';
import { Nutrition } from '../nutrition/entities/nutrition.entity';
import { Role } from '../role/entities/role.entity';
import { SelectedExercise } from '../selected-exercise/entities/selected-exercise.entity';
import { SuperUser } from '../user/entities/super-user.entity';
import { User } from '../user/entities/user.entity';
import { WorkoutRating } from '../workout/entities/workout-rating.entity';
import { Workout } from '../workout/entities/workout.entity';
import { AssignedWorkout } from '../workout/entities/assigned-workouts';
import { PersonalTrainerClient } from '../user/entities/personale-trainer-clients';

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
    @Inject(REPOSITORIES.NUTRITION_REPOSITORY)
    private readonly nutritionRepo: typeof Nutrition,
    @Inject(REPOSITORIES.EXERCISE_REPOSITORY)
    private readonly exerciseRepo: typeof Exercise,
    @Inject(REPOSITORIES.WORKOUT_REPOSITORY)
    private readonly workoutRepo: typeof Workout,
    @Inject(REPOSITORIES.WORKOUT_RATING_REPOSITORY)
    private readonly workoutRatingRepo: typeof WorkoutRating,
    @Inject(REPOSITORIES.SELECTED_EXERCISE_REPOSITORY)
    private readonly selectedExercise: typeof SelectedExercise,
    @Inject(REPOSITORIES.ROLE_REPOSITORY)
    private readonly roleRepo: typeof Role,
    @Inject(REPOSITORIES.ASSIGNED_CLIENT_REPOSITORY)
    private readonly assignedWorkoutRepo: typeof AssignedWorkout,
    @Inject(REPOSITORIES.PERSONAL_TRAINER_CLIENT_REPOSITORY)
    private readonly personalTrainerClientRepo: typeof PersonalTrainerClient,
  ) {
    this.repo['User'] = this.userRepository;
    this.repo['LoginToken'] = this.loginTokenRepository;
    this.repo['SuperUser'] = this.superUserRepository;
    this.repo['Nutrition'] = this.nutritionRepo;
    this.repo['Exercise'] = this.exerciseRepo;
    this.repo['Workout'] = this.workoutRepo;
    this.repo['WorkoutRating'] = this.workoutRatingRepo;
    this.repo['SelectedExercise'] = this.selectedExercise;
    this.repo['Role'] = this.roleRepo;
    this.repo['AssignedWorkout'] = this.assignedWorkoutRepo;
    this.repo['PersonalTrainerClient'] = this.personalTrainerClientRepo;
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
