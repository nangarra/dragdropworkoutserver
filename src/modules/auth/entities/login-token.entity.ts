import { json } from 'sequelize';
import {
  Table,
  Column,
  Model,
  AllowNull,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { PrimaryGeneratedColumn } from 'typeorm';
import { User } from 'src/modules/user/entities/user.entity';

@Table({
  tableName: 'login_tokens',
  timestamps: true,
  scopes: {
    active: { where: { isActive: true } },
  },
})
export class LoginToken extends Model {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column({
    type: DataType.UUID,
    field: 'fkUserId',
  })
  userId: string;

  @AllowNull(false)
  @Column(DataType.TEXT)
  token: string;

  @Column(DataType.DATE)
  expiredAt: Date;

  @Column(DataType.STRING(50))
  ip: string;

  @AllowNull(true)
  @Column(DataType.JSONB)
  userAgent: typeof json;

  @AllowNull(false)
  @Column(DataType.DATE)
  createdAt: Date;

  @Column(DataType.DATE)
  updatedAt: Date;

  //-- ASSOCIATIONS

  @BelongsTo(() => User)
  User: User;
}
