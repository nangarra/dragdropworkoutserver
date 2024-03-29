import {
  Table,
  Column,
  Model,
  AllowNull,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Exercise } from 'src/modules/exercise/entities/exercise.entity';
import { Nutrition } from 'src/modules/nutrition/entities/nutrition.entity';
import { Workout } from 'src/modules/workout/entities/workout.entity';
import { PrimaryGeneratedColumn } from 'typeorm';

@Table({
  tableName: 'selected_exercises',
  timestamps: true,
  paranoid: true,
})
export class SelectedExercise extends Model {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ForeignKey(() => Exercise)
  @Column({
    type: DataType.UUID,
    field: 'fkExerciseId',
  })
  exerciseId: string;

  @ForeignKey(() => Nutrition)
  @Column({
    type: DataType.UUID,
    field: 'fkNutritionId',
  })
  nutritionId: string;

  @AllowNull(false)
  @ForeignKey(() => Workout)
  @Column({
    type: DataType.UUID,
    field: 'fkWorkoutId',
  })
  workoutId: string;

  @Column(DataType.INTEGER)
  sets: number;

  @Column(DataType.INTEGER)
  repititions: number;

  @Column(DataType.INTEGER)
  seconds: number;

  @Column(DataType.INTEGER)
  minutes: number;

  @Column(DataType.INTEGER)
  sequence: number;

  @AllowNull(false)
  @Column(DataType.DATE)
  createdAt: Date;

  @Column(DataType.DATE)
  updatedAt: Date;

  @Column(DataType.DATE)
  deletedAt: Date;

  //-- ASSOCIATIONS

  @BelongsTo(() => Exercise, { foreignKey: 'exerciseId' })
  Exercise: Exercise;

  @BelongsTo(() => Nutrition, { foreignKey: 'nutritionId' })
  Nutrition: Nutrition;

  @BelongsTo(() => Workout, { foreignKey: 'workoutId' })
  Workout: Workout;
}
