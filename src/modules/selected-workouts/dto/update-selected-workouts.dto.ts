import { PartialType } from '@nestjs/mapped-types';
import { CreateSelectedWorkoutDto } from './create-selected-workouts.dto';

export class UpdateUserDto extends PartialType(CreateSelectedWorkoutDto) {}
