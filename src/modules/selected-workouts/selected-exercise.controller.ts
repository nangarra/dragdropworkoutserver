import {
  Body,
  Controller,
  Logger,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SelectedWorkoutService } from './selected-exercise.service';
import { GetLoggedInUser } from '../auth/decorators/get-logged-in-user.decorator';

@UseGuards(AuthGuard())
@Controller('selected-exercise')
export class SelectedWorkoutController {
  private logger = new Logger('SelectedWorkoutController');
  constructor(private readonly service: SelectedWorkoutService) {}

  @Post('/:id/save')
  save(
    @Param('id') id: string,
    @Body() body: any,
    @GetLoggedInUser() loggedInUser: any,
  ) {
    return this.service.save(id, body, loggedInUser);
  }
}
