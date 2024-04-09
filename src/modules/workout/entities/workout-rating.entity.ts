import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { PrimaryGeneratedColumn } from 'typeorm';
import { Workout } from './workout.entity';

@Table({
  tableName: 'workout_ratings',
  timestamps: true,
  paranoid: true,
})
export class WorkoutRating extends Model {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  rating: number;

  @ForeignKey(() => Workout)
  @Column({
    type: DataType.UUID,
    field: 'fkWorkoutId',
  })
  workoutId: string;

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
}
