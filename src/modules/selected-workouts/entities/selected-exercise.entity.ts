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
}
