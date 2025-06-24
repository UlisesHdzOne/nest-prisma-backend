import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { ChangePasswordDto } from '../dto/change-password-profile.dto';

@Injectable()
export class ChangePasswordUseCase {
  constructor(private readonly prisma: PrismaService) {}

  async execute(userId: number, dto: ChangePasswordDto) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });

    if (!user) throw new NotFoundException('Usuario no encontrado');

    const passwordValid = await bcrypt.compare(
      dto.currentPassword,
      user.password,
    );

    if (!passwordValid) {
      throw new UnauthorizedException('Contraseña actual incorrecta');
    }

    const hashedPassword = await bcrypt.hash(dto.newPassword, 10);

    await this.prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });

    return { message: 'Contraseña actualizada correctamente' };
  }
}
