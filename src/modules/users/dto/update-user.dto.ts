import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @ApiPropertyOptional({
    example: 'Jose',
    description: 'Nombre del usuario',
  })
  @Transform(({ value }) => value.trim())
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    example: 'user@example.com',
    description: 'Correo electrónico del usuario',
  })
  @Transform(({ value }) => value.trim().toLowerCase())
  @IsOptional()
  @IsEmail()
  email?: string;
}
