import { forwardRef, Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { roleProvider } from './role.provider';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [forwardRef(() => AuthModule)],
  controllers: [RoleController],
  providers: [RoleService, ...roleProvider],
  exports: [...roleProvider, RoleService],
})
export class RoleModule {}
