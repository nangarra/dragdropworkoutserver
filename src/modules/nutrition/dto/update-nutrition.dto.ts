import { PartialType } from '@nestjs/mapped-types';
import { CreateNutritionDto } from './create-nutrition.dto';

export class UpdateUserDto extends PartialType(CreateNutritionDto) {}
