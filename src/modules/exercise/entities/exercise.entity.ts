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
  tableName: 'exercises',
  timestamps: true,
  paranoid: true,
})
export class Exercise extends Model {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column(DataType.TEXT)
  title: string;

  @AllowNull(false)
  @Column(DataType.TEXT)
  discipline: string;

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

  @HasMany(() => SelectedExercise, { foreignKey: 'exerciseId' })
  SelectedExercise: SelectedExercise;
}
