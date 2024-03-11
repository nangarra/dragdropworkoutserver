import { Module, forwardRef } from '@nestjs/common';
import { ExerciseController } from './exercise.controller';
import { AuthModule } from 'src/modules/auth/auth.module';
import { authProvider } from 'src/modules/auth/auth.provider';
import { ExerciseService } from './exercise.service';

@Module({
  imports: [forwardRef(() => AuthModule)],
  controllers: [ExerciseController],
  providers: [ExerciseService, ...authProvider],
  exports: [ ExerciseService],
})
export class ExerciseModule {}
