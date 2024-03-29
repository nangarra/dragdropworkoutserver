import {
  AllowNull,
  Column,
  DataType,
  Model,
  Table,
  HasMany,
} from 'sequelize-typescript';
import { Exercise } from 'src/modules/exercise/entities/exercise.entity';
import { SelectedExercise } from 'src/modules/selected-exercise/entities/selected-exercise.entity';
import { PrimaryGeneratedColumn } from 'typeorm';
// import { Company } from 'src/modules/company/entities/company.entity';

@Table({
  tableName: 'nutritions',
  timestamps: true,
  paranoid: true,
})
export class Nutrition extends Model {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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

  @HasMany(() => SelectedExercise, { foreignKey: 'nutritionId' })
  SelectedExercise: SelectedExercise;
}
