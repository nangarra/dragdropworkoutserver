import { Module, forwardRef } from '@nestjs/common';
import { AuthModule } from 'src/modules/auth/auth.module';
import { authProvider } from 'src/modules/auth/auth.provider';
import { SelectedWorkoutController } from './selected-exercise.controller';
import { SelectedWorkoutService } from './selected-exercise.service';

@Module({
  imports: [forwardRef(() => AuthModule)],
  controllers: [SelectedWorkoutController],
  providers: [SelectedWorkoutService, ...authProvider],
  exports: [SelectedWorkoutService],
})
export class SelectedWorkoutModule {}
