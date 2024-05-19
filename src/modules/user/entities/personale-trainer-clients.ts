import {
  AllowNull,
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { User } from './user.entity';

@Table({
  tableName: 'personal_trainer_clients',
  timestamps: true,
  paranoid: true,
  scopes: {
    active: { where: { isActive: true } },
  },
})
export class PersonalTrainerClient extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  @AllowNull(false)
  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    field: 'fkTrainerId',
  })
  trainerId: string;

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

  @BelongsTo(() => User, { foreignKey: 'trainerId' })
  Trainer: User;

  @BelongsTo(() => User, { foreignKey: 'clientId' })
  Client: User;
}
