import {
  Injectable,
  InternalServerErrorException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { BASE_URL } from 'src/constants';
import { GlobalDbService } from '../global-db/global-db.service';
import * as sequelize from 'sequelize';
import * as _ from 'lodash';
const { Op } = sequelize;

@Injectable()
export class UserContextService {
  private logger = new Logger('UserContextService');
  private isActiveWhere = { isActive: true };

  constructor(private readonly DB: GlobalDbService) {}

  async getUserContext(loggedInUser: any): Promise<any> {
    const userData = loggedInUser.user;
    try {
      const cUserPromise = this.getUserDetails(userData);

      const [cUser] = await Promise.all([cUserPromise]);

      const isSuperAdmin = !_.isEmpty(cUser.SuperUser);

      const uC: any = {
        user: {
          id: cUser.id,
          username: cUser.username,
          email: cUser.email,
          phone: cUser.phone,
          profilePic: cUser.profilePic,
          passwordResetAt: cUser.passwordResetAt,
        },
        baseUrl: BASE_URL,
        isSuperAdmin,
      };

      return uC;
    } catch (e) {
      if (e.response && e.response.error == 'Unauthorized') {
        throw new UnauthorizedException('user is in-active');
      } else {
        this.logger.error('Error occured while getUserContext ', e);
        throw new InternalServerErrorException();
      }
    }
  }

  async getUserDetails(user: any): Promise<any> {
    const { repo } = this.DB;
    const { id } = user;
    try {
      const cUser = await repo.User.findOne({
        where: { id },
        attributes: [
          'id',
          'username',
          'email',
          'phone',
          'profilePic',
          'isActive',
        ],
        include: [
          {
            model: repo.SuperUser,
            as: 'SuperUser',
            required: false,
            where: this.isActiveWhere,
            attributes: ['id'],
          },
          // {
          //   model: repo.Company,
          //   as: 'CompanyAdmin',
          //   required: false,
          //   where: this.isActiveWhere,
          //   attributes: ['id', 'name'],
          // },
        ],
      });
      if (cUser && cUser.getDataValue('isActive')) {
        return cUser;
      } else {
        throw new UnauthorizedException('user is in-active');
      }
    } catch (e) {
      if (e.response && e.response.error == 'Unauthorized') {
        throw new UnauthorizedException('user is in-active');
      } else {
        this.logger.error('Error occured while getUserDetails ', e);
        throw new InternalServerErrorException();
      }
    }
  }
}
