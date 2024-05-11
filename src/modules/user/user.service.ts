import { ConflictException, Injectable, Logger } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import * as moment from 'moment-timezone';
import { GlobalDbService } from '../global-db/global-db.service';
import { UserContextService } from '../auth/user-context.service';

@Injectable()
export class UserService {
  private logger = new Logger('UserService');
  constructor(
    private readonly DB: GlobalDbService,
    private userContextService: UserContextService,
  ) {}

  updateUser = async (body: any, loggedInUser: any) => {
    await this.DB.repo.User.update(body, {
      where: { id: loggedInUser.user.id },
    });

    const context = await this.userContextService.getUserContext(loggedInUser);
    return context.user;
  };

  updateUserPassword = async (body: any, loggedInUser: any) => {
    const { password, currentPassword } = body;

    const user = await this.DB.repo.User.scope('withPassword').findOne({
      where: { id: loggedInUser.user.id },
    });

    const hashPassword = await bcrypt.hash(currentPassword, user.salt);

    if (hashPassword !== user.password) {
      throw new ConflictException('Invalid Current Password');
    }

    const newHashPassword = await bcrypt.hash(password, user.salt);

    const update = {
      password: newHashPassword,
      passwordResetAt: moment().add(1, 'month').toDate(),
    };

    await this.DB.repo.User.update(update, {
      where: { id: loggedInUser.user.id },
    });

    return { message: 'Password updated !' };
  };
}
