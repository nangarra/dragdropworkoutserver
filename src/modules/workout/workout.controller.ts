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
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Transaction } from 'sequelize';
import { TransactionParam } from 'src/database/transaction-param.decorator';
import { TransactionInterceptor } from 'src/database/transaction.interceptor';
import { GetLoggedInUser } from '../auth/decorators/get-logged-in-user.decorator';
import { WorkoutService } from './workout.service';

@Controller('workouts')
export class WorkoutController {
  private logger = new Logger('WorkoutController');
  constructor(private readonly service: WorkoutService) {}

  @Get('/get-one/:workout')
  getOne(@Param('workout') workout: string) {
    return this.service.getOne(workout);
  }

  @UseInterceptors(TransactionInterceptor)
  @Post('/create')
  create(@Body() body: any, @TransactionParam() transaction: Transaction) {
    return this.service.create(body, transaction);
  }

  @Post('/set-rating/:workoutId/:rating')
  setRating(
    @Param('workoutId') workoutId: string,
    @Param('rating') rating: number,
  ) {
    return this.service.setRating(workoutId, rating);
  }

  @Get('/get-all')
  getAll(@Query() query: any) {
    return this.service.getAll(query);
  }

  @UseGuards(AuthGuard())
  @Delete('/:id')
  delete(@Param('id') id: string, @GetLoggedInUser() loggedInUser: any) {
    return this.service.delete(id, loggedInUser);
  }
}
