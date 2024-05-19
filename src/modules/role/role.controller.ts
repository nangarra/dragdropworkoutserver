import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard())
@Controller('role')
export class RoleController {
  constructor() {}
}
