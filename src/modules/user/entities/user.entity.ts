import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  Unique,
  Default,
  AllowNull,
  DataType,
  HasOne,
  HasMany,
  DefaultScope,
  Scopes,
} from 'sequelize-typescript';
import { LoginToken } from 'src/modules/auth/entities/login-token.entity';
import { SuperUser } from './super-user.entity';

@DefaultScope(() => ({
  attributes: { exclude: ['password', 'salt'] },
}))
@Scopes(() => ({
  withPassword: {},
}))
@Table({
  tableName: 'users',
  timestamps: true,
  paranoid: true,
  scopes: {
    active: { where: { isActive: true } },
  },
})
export class User extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  @Unique(true)
  @Column(DataType.STRING(20))
  username: string;

  @Column(DataType.STRING(100))
  password: string;

  @Column(DataType.STRING(50))
  email: string;

  @Column(DataType.STRING(20))
  phone: string;

  @Column(DataType.TEXT)
  profilePic: string;

  @Default(true)
  @AllowNull(false)
  @Column(DataType.BOOLEAN)
  isActive: boolean;

  @Column(DataType.STRING)
  salt: string;

  @Column(DataType.DATE)
  passwordResetAt: Date;

  @AllowNull(false)
  @Column(DataType.DATE)
  createdAt: Date;

  @Column(DataType.DATE)
  updatedAt: Date;

  @Column(DataType.DATE)
  deletedAt: Date;

  //-- ASSOCIATIONS

  @HasOne(() => SuperUser, { foreignKey: 'userId', as: 'SuperUser' })
  SuperUser: SuperUser;

  @HasMany(() => LoginToken, { foreignKey: 'userId' })
  LoginToken: LoginToken;
}
