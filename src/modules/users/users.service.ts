import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserUseCase } from './use-cases/create-user.use-case';
import { FindAllUsersUseCase } from './use-cases/find-all-users.use-case';
import { FindOneUserUseCase } from './use-cases/find-one-user.use-case';
import { UpdateUserUseCase } from './use-cases/update-user.use-case';
import { DeleteUserUseCase } from './use-cases/delete-user.use-case';

@Injectable()
export class UsersService {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly findAllUsersUseCase: FindAllUsersUseCase,
    private readonly findOneUserUseCase: FindOneUserUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase,
  ) {}

  async create(dto: CreateUserDto) {
    return this.createUserUseCase.execute(dto);
  }

  findAll() {
    return this.findAllUsersUseCase.execute();
  }

  remove(id: number) {
    return this.deleteUserUseCase.execute(id);
  }

  findOne(id: number) {
    return this.findOneUserUseCase.execute(id);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.updateUserUseCase.execute(id, updateUserDto);
  }
}
