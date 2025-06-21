import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/modules/users/users.service';
import { CreateUserDto } from 'src/modules/users/dto/create-user.dto';

@Injectable()
export class RegisterUseCase {
  constructor(private readonly usersService: UsersService) {}

  async execute(dto: CreateUserDto) {
    return this.usersService.create(dto);
  }
}
