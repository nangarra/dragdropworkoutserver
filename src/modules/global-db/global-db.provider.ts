import { TransactionInterceptor } from 'src/database/transaction.interceptor';
import { REPOSITORIES } from 'src/constants/repositories';
import { LoginToken } from '../auth/entities/login-token.entity';
import { SuperUser } from '../user/entities/super-user.entity';
import { User } from '../user/entities/user.entity';
import { Exercise } from '../exercise/entities/exercise.entity';
import { Workout } from '../workout/entities/workout.entity';
import { SelectedExercise } from '../selected-workouts/entities/selected-exercise.entity';

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
    provide: REPOSITORIES.WORKOUT_REPOSITORY,
    useValue: Workout,
  },
  {
    provide: REPOSITORIES.EXERCISE_REPOSITORY,
    useValue: Exercise,
  },
  {
    provide: REPOSITORIES.SELECTED_EXERCISE_REPOSITORY,
    useValue: SelectedExercise,
  },
];
