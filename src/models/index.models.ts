import { User } from 'src/modules/user/entities/user.entity';
import { SuperUser } from 'src/modules/user/entities/super-user.entity';
import { LoginToken } from 'src/modules/auth/entities/login-token.entity';
import { Nutrition } from 'src/modules/nutrition/entities/nutrition.entity';
import { Exercise } from 'src/modules/exercise/entities/exercise.entity';
import { SelectedExercise } from 'src/modules/selected-exercise/entities/selected-exercise.entity';
import { Workout } from 'src/modules/workout/entities/workout.entity';

const models = [
  User,
  SuperUser,
  LoginToken,
  Nutrition,
  Exercise,
  Workout,
  SelectedExercise,
];

export const appModels = models;
