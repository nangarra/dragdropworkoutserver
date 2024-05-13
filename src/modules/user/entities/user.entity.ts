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
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { LoginToken } from 'src/modules/auth/entities/login-token.entity';
import { SuperUser } from './super-user.entity';
import { Role } from 'src/modules/role/entities/role.entity';
import { Workout } from 'src/modules/workout/entities/workout.entity';
import { PersonalTrainerClient } from './personale-trainer-clients';
import { AssignedWorkout } from 'src/modules/workout/entities/assigned-workouts';

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
  description: string;

  @Column(DataType.JSONB)
  socials: JSON;

  @Column(DataType.TEXT)
  location: string;

  @Column(DataType.TEXT)
  profilePic: string;

  @AllowNull(false)
  @ForeignKey(() => Role)
  @Column({
    type: DataType.UUID,
    field: 'fkRoleId',
  })
  roleId: string;

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

  @BelongsTo(() => Role, { foreignKey: 'roleId' })
  Role: Role;

  @HasMany(() => Workout, { foreignKey: 'createdBy' })
  Workout: Workout;

  @HasMany(() => PersonalTrainerClient, { foreignKey: 'trainerId' })
  Trainer: PersonalTrainerClient;

  @HasMany(() => PersonalTrainerClient, { foreignKey: 'clientId' })
  Client: PersonalTrainerClient;

  @HasMany(() => AssignedWorkout, { foreignKey: 'clientId' })
  AssignedWorkout: AssignedWorkout;
}
