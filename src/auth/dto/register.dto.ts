import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength, IsOptional } from 'class-validator';

export class RegisterDto {
  @ApiProperty({
    example: 'user@example.com',
    description: 'Email del usuario',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '123456',
    description: 'Contraseña (mínimo 6 caracteres)',
  })
  @MinLength(6)
  password: string;

  @ApiProperty({
    example: 'Juan',
    description: 'Nombre del usuario',
    required: false,
  })
  @IsOptional()
  @IsNotEmpty()
  name?: string;
}
