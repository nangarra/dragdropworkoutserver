import { Controller, UseGuards, Logger } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';

@UseGuards(AuthGuard())
@Controller('users')
export class UserController {
  private logger = new Logger('UserController');
  constructor(private readonly userService: UserService) {}
}
