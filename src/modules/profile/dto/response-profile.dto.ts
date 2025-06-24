import { ApiProperty } from '@nestjs/swagger';

export class ResponseProfileDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  role: string;
}
