import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { ExerciseModule } from './modules/exercise/exercise.module';
import { GlobalDbModule } from './modules/global-db/global-db.module';
import { NutritionModule } from './modules/nutrition/nutrition.module';
import { SelectedExerciseModule } from './modules/selected-exercise/selected-exercise.module';
import { UserModule } from './modules/user/user.module';
import { WorkoutModule } from './modules/workout/workout.module';

@Module({
  imports: [
    GlobalDbModule,
    AuthModule,
    DatabaseModule,
    UserModule,
    NutritionModule,
    ExerciseModule,
    WorkoutModule,
    SelectedExerciseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
