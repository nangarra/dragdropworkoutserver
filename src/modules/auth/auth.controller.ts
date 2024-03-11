import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  ValidationPipe,
  UseGuards,
  Ip,
  Headers,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { GetToken } from './decorators/get-token.decorator';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/sign-in')
  login(
    @Body(new ValidationPipe({ transform: true }))
    authCredentialsDto: AuthCredentialsDto,
    @Ip() ip: string,
    @Headers('user-agent') userAgent: any,
  ): Promise<{ token: string }> {
    return this.authService.login(authCredentialsDto, {
      ip,
      userAgent,
    });
  }

  @Get('/sign-out')
  @UseGuards(AuthGuard())
  logout(@GetToken() token: string): any {
    this.authService.logout(token);
    return { success: true };
  }

  @Post('/sign-up')
  signUp(
    @Body(ValidationPipe) createUserDto: CreateUserDto,
    @Ip() ip: string,
    @Headers('user-agent') userAgent: any,
  ): Promise<any> {
    return this.authService.signUp(createUserDto, { ip, userAgent });
  }

  // @Put('/resetPassword/:token')
  // @UseGuards(ResetPasswordGuard)
  // resetPassword(
  //   @Body(ValidationPipe) authResetPasswordDto: AuthResetPasswordDto,
  //   @Param('token') token: string,
  // ): Promise<any> {
  //   return this.authService.resetPassword(authResetPasswordDto, token);
  // }

  // @Post('/changePassword')
  // @UseGuards(AuthGuard())
  // changePassword(
  //   @Body() data: any,
  //   @GetLoggedInUser() loggedInUser: any,
  // ): Promise<void> {
  //   return this.authService.changePassword(data, loggedInUser);
  // }

  // @Post('/updatePassword')
  // @UseGuards(AuthGuard())
  // updatePassword(
  //   @Body() data: any,
  //   @GetLoggedInUser() loggedInUser: any,
  // ): Promise<void> {
  //   return this.authService.updatePassword(data, loggedInUser);
  // }
}
