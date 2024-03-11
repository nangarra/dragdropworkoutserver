import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { WorkoutService } from './workout.service';
import { GetLoggedInUser } from '../auth/decorators/get-logged-in-user.decorator';

@UseGuards(AuthGuard())
@Controller('workouts')
export class WorkoutController {
  private logger = new Logger('WorkoutController');
  constructor(private readonly service: WorkoutService) {}

  @Post('/save')
  save(@Body() body: any, @GetLoggedInUser() loggedInUser: any) {
    return this.service.save(body, loggedInUser);
  }

  @Get('/get-all')
  getAll(@Query() query: any) {
    return this.service.getAll(query);
  }

  @Delete('/:id')
  delete(@Param('id') id: string, @GetLoggedInUser() loggedInUser: any) {
    return this.service.delete(id, loggedInUser);
  }
}
