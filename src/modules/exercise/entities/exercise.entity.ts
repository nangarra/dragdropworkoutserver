import {
  Table,
  Column,
  Model,
  AllowNull,
  DataType,
  ForeignKey,
  BelongsTo,
  HasOne,
} from 'sequelize-typescript';
import { PrimaryGeneratedColumn } from 'typeorm';
import { Workout } from 'src/modules/workout/entities/workout.entity';
import { SelectedExercise } from 'src/modules/selected-workouts/entities/selected-exercise.entity';

@Table({
  tableName: 'exercises',
  timestamps: true,
  paranoid: true,
})
export class Exercise extends Model {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ForeignKey(() => Workout)
  @Column({
    type: DataType.UUID,
    field: 'fkWorkoutId',
  })
  workoutId: string;

  @Column(DataType.TEXT)
  title: string;

  @Column(DataType.TEXT)
  description: string;

  @Column(DataType.TEXT)
  thumbnail: string;

  @AllowNull(false)
  @Column(DataType.DATE)
  createdAt: Date;

  @Column(DataType.DATE)
  updatedAt: Date;

  @Column(DataType.DATE)
  deletedAt: Date;

  //-- ASSOCIATIONS

  @BelongsTo(() => Workout, { foreignKey: 'workoutId' })
  Workout: Workout;

  @HasOne(() => SelectedExercise, { foreignKey: 'exerciseId' })
  SelectedExercise: SelectedExercise;
}
