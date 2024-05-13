import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Transaction } from 'sequelize';
import { TransactionParam } from 'src/database/transaction-param.decorator';
import { TransactionInterceptor } from 'src/database/transaction.interceptor';
import { GetLoggedInUser } from '../auth/decorators/get-logged-in-user.decorator';
import { ClientService } from './client.service';

@Controller('clients')
export class ClientController {
  private logger = new Logger('ClientController');
  constructor(private readonly service: ClientService) {}

  @Get('/get-one/:client')
  getOne(@Param('client') client: string) {
    return this.service.getOne(client);
  }

  @UseInterceptors(TransactionInterceptor)
  @Post('/create')
  create(@Body() body: any, @TransactionParam() transaction: Transaction) {
    return this.service.create(body, transaction);
  }

  @Post('/set-rating/:clientId/:rating')
  setRating(
    @Param('clientId') clientId: string,
    @Param('rating') rating: number,
  ) {
    return this.service.setRating(clientId, rating);
  }

  @Get('/get-all')
  getAll(@Query() query: any) {
    return this.service.getAll(query);
  }

  @UseGuards(AuthGuard())
  @Delete('/:id')
  delete(@Param('id') id: string, @GetLoggedInUser() loggedInUser: any) {
    return this.service.delete(id, loggedInUser);
  }
}
