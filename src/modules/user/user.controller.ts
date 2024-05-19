import {
  Controller,
  UseGuards,
  Logger,
  Post,
  Body,
  Get,
  Param,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { GetLoggedInUser } from '../auth/decorators/get-logged-in-user.decorator';

@Controller('users')
export class UserController {
  private logger = new Logger('UserController');
  constructor(private readonly service: UserService) {}

  @UseGuards(AuthGuard())
  @Post('/update-user')
  updateUser(@Body() body: any, @GetLoggedInUser() loggedInUser: any) {
    return this.service.updateUser(body, loggedInUser);
  }

  @UseGuards(AuthGuard())
  @Post('/update-password')
  updateUserPassword(@Body() body: any, @GetLoggedInUser() loggedInUser: any) {
    return this.service.updateUserPassword(body, loggedInUser);
  }

  @Get('/get-user/:id')
  getUser(@Param('id') id: string) {
    return this.service.getUser(id);
  }
}
