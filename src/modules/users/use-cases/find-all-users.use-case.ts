import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class FindAllUsersUseCase {
  constructor(private readonly prisma: PrismaService) {}

  async execute() {
    return this.prisma.user.findMany();
  }
}
