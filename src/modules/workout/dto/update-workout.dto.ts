import { PartialType } from '@nestjs/mapped-types';
import { CreateWorkoutDto } from './create-workout.dto';

export class UpdateUserDto extends PartialType(CreateWorkoutDto) {}
