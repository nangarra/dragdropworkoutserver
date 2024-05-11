import { Role } from './entities/role.entity';
import { REPOSITORIES } from 'src/constants/repositories';

export const roleProvider = [
  {
    provide: REPOSITORIES.ROLE_REPOSITORY,
    useValue: Role,
  },
];
