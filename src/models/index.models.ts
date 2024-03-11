import { User } from 'src/modules/user/entities/user.entity';
import { SuperUser } from 'src/modules/user/entities/super-user.entity';
import { LoginToken } from 'src/modules/auth/entities/login-token.entity';
import { Workout } from 'src/modules/workout/entities/workout.entity';
import { Exercise } from 'src/modules/exercise/entities/exercise.entity';
import { SelectedExercise } from 'src/modules/selected-workouts/entities/selected-exercise.entity';

const models = [
  User,
  SuperUser,
  LoginToken,
  Workout,
  Exercise,
  SelectedExercise,
];

export const appModels = models;
