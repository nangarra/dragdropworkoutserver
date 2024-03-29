import {
  AllowNull,
  Column,
  DataType,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { SelectedExercise } from 'src/modules/selected-exercise/entities/selected-exercise.entity';
import { PrimaryGeneratedColumn } from 'typeorm';

@Table({
  tableName: 'workouts',
  timestamps: true,
  paranoid: true,
})
export class Workout extends Model {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column(DataType.TEXT)
  title: string;

  @Column(DataType.TEXT)
  description: string;

  @AllowNull(false)
  @Column(DataType.DATE)
  createdAt: Date;

  @Column(DataType.DATE)
  updatedAt: Date;

  @Column(DataType.DATE)
  deletedAt: Date;

  //-- ASSOCIATIONS

  @HasMany(() => SelectedExercise, { foreignKey: 'workoutId' })
  SelectedExercise: SelectedExercise;
}
