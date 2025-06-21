import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UpdateUserUseCase {
  constructor(private readonly prisma: PrismaService) {}

  async execute(id: number, data: UpdateUserDto) {
    const exists = await this.prisma.user.findUnique({ where: { id } });

    if (!exists) {
      throw new NotFoundException('Usuario no encontrado');
    }

    return this.prisma.user.update({
      where: { id },
      data,
    });
  }
}
