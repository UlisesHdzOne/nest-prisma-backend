import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class DeleteUserUseCase {
  constructor(private readonly prisma: PrismaService) {}

  async execute(id: number) {
    const exists = await this.prisma.user.findUnique({ where: { id } });

    if (!exists) {
      throw new NotFoundException('Usuario no encontrado');
    }

    return this.prisma.user.delete({ where: { id } });
  }
}
