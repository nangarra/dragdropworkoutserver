import { IsNotEmpty } from 'class-validator';
export class CreateRoleDto {
  @IsNotEmpty()
  companyId: string;
}
