import { Controller, UseGuards, Logger, Post, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { GetLoggedInUser } from '../auth/decorators/get-logged-in-user.decorator';

@UseGuards(AuthGuard())
@Controller('users')
export class UserController {
  private logger = new Logger('UserController');
  constructor(private readonly service: UserService) {}

  @Post('/update-user')
  updateUser(@Body() body: any, @GetLoggedInUser() loggedInUser: any) {
    return this.service.updateUser(body, loggedInUser);
  }

  @Post('/update-password')
  updateUserPassword(@Body() body: any, @GetLoggedInUser() loggedInUser: any) {
    return this.service.updateUserPassword(body, loggedInUser);
  }
}
