import { Module, forwardRef } from '@nestjs/common';
import { AuthModule } from 'src/modules/auth/auth.module';
import { authProvider } from 'src/modules/auth/auth.provider';
import { NutritionController } from './nutrition.controller';
import { NutritionService } from './nutrition.service';

@Module({
  imports: [forwardRef(() => AuthModule)],
  controllers: [NutritionController],
  providers: [NutritionService, ...authProvider],
  exports: [NutritionService],
})
export class NutritionModule {}
