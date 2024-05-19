import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
  Unique,
} from 'sequelize-typescript';
import { SelectedExercise } from 'src/modules/selected-exercise/entities/selected-exercise.entity';
import { PrimaryGeneratedColumn } from 'typeorm';
import { WorkoutRating } from './workout-rating.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { AssignedWorkout } from './assigned-workouts';

@Table({
  tableName: 'workouts',
  timestamps: true,
  paranoid: true,
})
export class Workout extends Model {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Unique(true)
  @AllowNull(false)
  @Column(DataType.TEXT)
  title: string;

  @Column(DataType.TEXT)
  description: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    field: 'fkCreatedBy',
  })
  createdBy: string;

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

  @HasMany(() => WorkoutRating, { foreignKey: 'workoutId' })
  WorkoutRating: WorkoutRating;

  @HasMany(() => AssignedWorkout, { foreignKey: 'workoutId' })
  AssignedWorkout: AssignedWorkout;

  @BelongsTo(() => User, { foreignKey: 'createdBy' })
  User: User;
}
