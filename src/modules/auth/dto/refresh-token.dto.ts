import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class RefreshTokenDto {
  @ApiProperty({
    example: 'a3f5d7e8c9b1...',
    description: 'Token de actualización generado al hacer login',
  })
  @Transform(({ value }) => value.trim())
  @IsString()
  @IsNotEmpty()
  refresh_token: string;
}
