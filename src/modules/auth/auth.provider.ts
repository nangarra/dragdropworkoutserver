import { LoginToken } from './entities/login-token.entity';
import { REPOSITORIES } from 'src/constants/repositories';

export const authProvider = [
  {
    provide: REPOSITORIES.LOGIN_TOKEN_REPOSITORY,
    useValue: LoginToken,
  },
];
