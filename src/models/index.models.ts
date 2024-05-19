import { User } from 'src/modules/user/entities/user.entity';
import { SuperUser } from 'src/modules/user/entities/super-user.entity';
import { LoginToken } from 'src/modules/auth/entities/login-token.entity';
import { Nutrition } from 'src/modules/nutrition/entities/nutrition.entity';
import { Exercise } from 'src/modules/exercise/entities/exercise.entity';
import { SelectedExercise } from 'src/modules/selected-exercise/entities/selected-exercise.entity';
import { Workout } from 'src/modules/workout/entities/workout.entity';
import { WorkoutRating } from 'src/modules/workout/entities/workout-rating.entity';
import { Role } from 'src/modules/role/entities/role.entity';
import { AssignedWorkout } from 'src/modules/workout/entities/assigned-workouts';
import { PersonalTrainerClient } from 'src/modules/user/entities/personale-trainer-clients';

const models = [
  User,
  SuperUser,
  LoginToken,
  Nutrition,
  Exercise,
  Workout,
  WorkoutRating,
  SelectedExercise,
  Role,
  AssignedWorkout,
  PersonalTrainerClient,
];

export const appModels = models;
