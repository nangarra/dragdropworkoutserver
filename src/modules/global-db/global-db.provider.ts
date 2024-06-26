import { TransactionInterceptor } from 'src/database/transaction.interceptor';
import { REPOSITORIES } from 'src/constants/repositories';
import { LoginToken } from '../auth/entities/login-token.entity';
import { SuperUser } from '../user/entities/super-user.entity';
import { User } from '../user/entities/user.entity';
import { Exercise } from '../exercise/entities/exercise.entity';
import { Nutrition } from '../nutrition/entities/nutrition.entity';
import { SelectedExercise } from '../selected-exercise/entities/selected-exercise.entity';
import { Workout } from '../workout/entities/workout.entity';
import { WorkoutRating } from '../workout/entities/workout-rating.entity';
import { Role } from '../role/entities/role.entity';
import { AssignedWorkout } from '../workout/entities/assigned-workouts';
import { PersonalTrainerClient } from '../user/entities/personale-trainer-clients';

export const globalDbProvider = [
  TransactionInterceptor,
  {
    provide: REPOSITORIES.USER_REPOSITORY,
    useValue: User,
  },
  {
    provide: REPOSITORIES.SUPER_USER_REPOSITORY,
    useValue: SuperUser,
  },
  {
    provide: REPOSITORIES.LOGIN_TOKEN_REPOSITORY,
    useValue: LoginToken,
  },
  {
    provide: REPOSITORIES.NUTRITION_REPOSITORY,
    useValue: Nutrition,
  },
  {
    provide: REPOSITORIES.EXERCISE_REPOSITORY,
    useValue: Exercise,
  },
  {
    provide: REPOSITORIES.WORKOUT_REPOSITORY,
    useValue: Workout,
  },
  {
    provide: REPOSITORIES.WORKOUT_RATING_REPOSITORY,
    useValue: WorkoutRating,
  },
  {
    provide: REPOSITORIES.SELECTED_EXERCISE_REPOSITORY,
    useValue: SelectedExercise,
  },
  {
    provide: REPOSITORIES.ROLE_REPOSITORY,
    useValue: Role,
  },
  {
    provide: REPOSITORIES.ASSIGNED_CLIENT_REPOSITORY,
    useValue: AssignedWorkout,
  },
  {
    provide: REPOSITORIES.PERSONAL_TRAINER_CLIENT_REPOSITORY,
    useValue: PersonalTrainerClient,
  },
];
