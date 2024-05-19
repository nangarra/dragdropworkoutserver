import { Module, forwardRef } from '@nestjs/common';
import { UserService } from './user.service';
import { userProvider } from './user.provider';
import { UserController } from './user.controller';
import { AuthModule } from 'src/modules/auth/auth.module';
import { authProvider } from 'src/modules/auth/auth.provider';
import { ClientController } from './client.controller';
import { ClientService } from './client.service';

@Module({
  imports: [forwardRef(() => AuthModule)],
  controllers: [UserController, ClientController],
  providers: [UserService, ClientService, ...userProvider, ...authProvider],
  exports: [...userProvider, UserService, ClientService],
})
export class UserModule {}
