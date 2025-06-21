import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @ApiPropertyOptional({
    example: 'Jose',
    description: 'Nombre del usuario',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    example: 'user@example.com',
    description: 'Correo electrónico del usuario',
  })
  @IsOptional()
  @IsEmail()
  email?: string;
}
