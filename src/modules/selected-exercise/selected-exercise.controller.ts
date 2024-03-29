import {
  Body,
  Controller,
  Logger,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SelectedExerciseService } from './selected-exercise.service';
import { GetLoggedInUser } from '../auth/decorators/get-logged-in-user.decorator';

@UseGuards(AuthGuard())
@Controller('selected-exercise')
export class SelectedExerciseController {
  private logger = new Logger('SelectedExerciseController');
  constructor(private readonly service: SelectedExerciseService) {}

  @Post('/:id/save')
  save(
    @Param('id') id: string,
    @Body() body: any,
    @GetLoggedInUser() loggedInUser: any,
  ) {
    return this.service.save(id, body, loggedInUser);
  }
}
