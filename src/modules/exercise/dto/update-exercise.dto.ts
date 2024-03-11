import { PartialType } from '@nestjs/mapped-types';
import { CreateExerciseDto } from './create-exercise.dto';

export class UpdateUserDto extends PartialType(CreateExerciseDto) {}
