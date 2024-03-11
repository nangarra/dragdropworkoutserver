import {
  Injectable,
  Inject,
  UnauthorizedException,
  InternalServerErrorException,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import * as moment from 'moment-timezone';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/modules/user/entities/user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { REPOSITORIES } from 'src/constants/repositories';
import { LoginTokenService } from './login-token.service';
import { LoginToken } from './entities/login-token.entity';
import { UserContextService } from './user-context.service';
import { Validate } from '../../helpers/validate';
import { UNIQUE_KEY_VIOLATION } from 'src/constants';
import { GlobalDbService } from '../global-db/global-db.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(REPOSITORIES.USER_REPOSITORY)
    private readonly userRepository: typeof User,
    @Inject(REPOSITORIES.LOGIN_TOKEN_REPOSITORY)
    private readonly loginTokenRepository: typeof LoginToken,
    @Inject(LoginTokenService)
    private readonly loginTokenService,
    @Inject(UserContextService)
    private readonly userContextService,
    private readonly validate: Validate,
    @Inject(GlobalDbService)
    private readonly DB,
  ) {}

  async login(
    authCredentialsDto: AuthCredentialsDto,
    clientInfo: any,
  ): Promise<any> {
    const user = await this.validateUserPassword(authCredentialsDto);
    if (!user) {
      return this.throwInvalidCredentialsException();
    }
    const token: any = await this.loginTokenService.generateToken(user, {
      ...clientInfo,
      rememberMe: authCredentialsDto.rememberMe,
    });
    return token;
  }

  async signUp(user: any, clientInfo: any) {
    const { password } = user;
    const userWhere: any = {};
    userWhere.username = user.username;
    const existingUser = await this.DB.getOne('User', userWhere);
    if (existingUser) {
      throw new ConflictException('Username already exists.');
    }
    user.salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(password, user.salt);
    try {
      const savedUser = await this.DB.repo.User.create(user);
      const token: any = await this.loginTokenService.generateToken(savedUser, {
        ...clientInfo,
      });
      return token;
    } catch (error) {
      if (error.parent.code === UNIQUE_KEY_VIOLATION) {
        throw new ConflictException('User already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async validateUserPassword(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<User> {
    const { email, password } = authCredentialsDto;
    const user = await this.userRepository
      .scope('withPassword')
      .findOne({ where: { email } });

    if (user) {
      const hash = await bcrypt.hash(password, user.salt);
      if (hash === user.password) {
        return user;
      }
    }
    return null;
  }

  async logout(token: string): Promise<void> {
    await this.loginTokenService.expireToken(token);
  }

  async updatePassword(data: any, loggedInUser: any): Promise<any> {
    const { password, confirmPassword } = data;

    if (password === confirmPassword) {
      const salt = await bcrypt.genSalt();
      const newPassword = await bcrypt.hash(password, salt);

      const update = {
        salt,
        password: newPassword,
        passwordResetAt: moment(moment()).add(1, 'month').toDate(),
      };
      await this.userRepository.update(update, {
        where: { id: loggedInUser.user.id },
      });

      return { success: true };
    }
    throw new BadRequestException('Confirm password does not match');
  }

  async changePassword(data: any, loggedInUser: any): Promise<any> {
    const { currentPassword, newPassword: password, confirmPassword } = data;

    const { username } = loggedInUser;

    const validate: any = {
      username,
      password: currentPassword,
    };
    const response = await this.validateUserPassword(validate);
    if (response) {
      if (password === confirmPassword) {
        const newPassword = await bcrypt.hash(password, response.salt);

        if (response.password !== newPassword) {
          const update = {
            password: newPassword,
            passwordResetAt: moment(moment()).add(1, 'month').toDate(),
          };
          await this.userRepository.update(update, {
            where: { id: loggedInUser.user.id },
          });

          return { success: true };
        }
        throw new BadRequestException(
          'You used an old password. To protect your account, choose a new password.',
        );
      }
      throw new BadRequestException('Confirm password does not match');
    }
    throw new BadRequestException('Invalid current password');
  }

  async throwInvalidCredentialsException() {
    throw new UnauthorizedException('Invalid credentials');
  }

  async getLoggedInUserByToken(tokenBearer: string) {
    const token = tokenBearer.substring(7);

    const tokenDetail = await this.loginTokenRepository.findOne({
      where: { token },
      include: { model: User },
    });
    await this.validate.token(tokenDetail);
    const loggedInUser = await this.userContextService.getUserContext(
      tokenDetail,
    );
    return loggedInUser;
  }
}
