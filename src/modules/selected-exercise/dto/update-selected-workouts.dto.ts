import { PartialType } from '@nestjs/mapped-types';
import { CreateSelectedExerciseDto } from './create-selected-workouts.dto';

export class UpdateUserDto extends PartialType(CreateSelectedExerciseDto) {}
