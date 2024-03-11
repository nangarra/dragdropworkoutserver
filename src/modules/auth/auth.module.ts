import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JWT_SECRET_KEY, DEFAULT_PASSPORT_STRATEGY } from '../../constants';
import { UserModule } from 'src/modules/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { LoginTokenService } from './login-token.service';
import { authProvider } from './auth.provider';
import { UserContextController } from './user-context.controller';
import { UserContextService } from './user-context.service';
import { Validate } from 'src/helpers/validate';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: DEFAULT_PASSPORT_STRATEGY }),
    JwtModule.register({
      secret: JWT_SECRET_KEY,
    }),
    UserModule,
    Validate
  ],
  controllers: [AuthController, UserContextController],
  providers: [
    AuthService,
    JwtStrategy,
    LoginTokenService,
    UserContextService,
    Validate,
    ...authProvider,
  ],
  exports: [JwtStrategy, PassportModule, UserContextService, AuthService],
})
export class AuthModule {}
