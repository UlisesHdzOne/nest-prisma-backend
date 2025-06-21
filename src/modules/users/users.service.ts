import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserUseCase } from './use-cases/create-user.use-case';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly createUserUseCase: CreateUserUseCase,
  ) {}

  async create(dto: CreateUserDto) {
    return this.createUserUseCase.execute(dto);
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  remove(id: number) {
    return this.prisma.user.delete({
      where: { id },
    });
  }

  findOne(id: number) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
  }
}
