import { ApiPropertyOptional, OmitType } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { UpdateUserDto } from 'src/modules/users/dto/update-user.dto';

export class UpdateProfileDto extends OmitType(UpdateUserDto, [
  'role',
] as const) {
  @ApiPropertyOptional({ example: 'https://miweb.com/avatar.png' })
  @IsOptional()
  @IsString()
  profileImage?: string;
}
