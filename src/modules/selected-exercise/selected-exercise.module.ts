import { Module, forwardRef } from '@nestjs/common';
import { AuthModule } from 'src/modules/auth/auth.module';
import { authProvider } from 'src/modules/auth/auth.provider';
import { SelectedExerciseController } from './selected-exercise.controller';
import { SelectedExerciseService } from './selected-exercise.service';

@Module({
  imports: [forwardRef(() => AuthModule)],
  controllers: [SelectedExerciseController],
  providers: [SelectedExerciseService, ...authProvider],
  exports: [SelectedExerciseService],
})
export class SelectedExerciseModule {}
