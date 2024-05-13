import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from 'src/modules/user/entities/user.entity';
import { PrimaryGeneratedColumn } from 'typeorm';
import { Workout } from './workout.entity';

@Table({
  tableName: 'assigned_workouts',
  timestamps: true,
  paranoid: true,
})
export class AssignedWorkout extends Model {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @AllowNull(false)
  @ForeignKey(() => Workout)
  @Column({
    type: DataType.UUID,
    field: 'fkWorkoutId',
  })
  workoutId: string;

  @AllowNull(false)
  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    field: 'fkClientId',
  })
  clientId: string;

  @AllowNull(false)
  @Column(DataType.DATE)
  createdAt: Date;

  @Column(DataType.DATE)
  updatedAt: Date;

  @Column(DataType.DATE)
  deletedAt: Date;

  //-- ASSOCIATIONS

  @BelongsTo(() => User, { foreignKey: 'clientId' })
  Client: User;

  @BelongsTo(() => Workout, { foreignKey: 'workoutId' })
  Workout: Workout;
}
