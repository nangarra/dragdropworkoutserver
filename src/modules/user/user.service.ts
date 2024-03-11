import { Injectable, Logger } from '@nestjs/common';
import { GlobalDbService } from '../global-db/global-db.service';

@Injectable()
export class UserService {
  private logger = new Logger('UserService');
  constructor(private readonly DB: GlobalDbService) {}
}
