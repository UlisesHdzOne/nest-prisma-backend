import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { randomBytes } from 'crypto';
import { CreateUserDto } from 'src/modules/users/dto/create-user.dto';
import { UsersService } from 'src/modules/users/users.service';
import { PrismaService } from '../prisma/prisma.service';
import { LoginUseCase } from './use-cases/login.use-case';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,

    private readonly loginUseCase: LoginUseCase,
  ) {}

  async register(dto: CreateUserDto) {
    const { name, email, password } = dto;
    return this.usersService.create({ name, email, password });
  }

  async login(loginDto: { email: string; password: string }) {
    return this.loginUseCase.execute(loginDto);
  }

  async refreshToken(token: string) {
    // Buscar token en DB
    const storedToken = await this.prisma.refreshToken.findFirst({
      where: { token },
      include: { user: true },
    });

    if (!storedToken) {
      throw new UnauthorizedException('Refresh token inválido');
    }

    // Crear nuevo access token
    const newAccessToken = await this.jwtService.signAsync({
      sub: storedToken.user.id,
      email: storedToken.user.email,
      role: storedToken.user.role,
    });

    // Opcional: crear nuevo refresh token y actualizar en DB
    const newRefreshToken = randomBytes(64).toString('hex');
    await this.prisma.refreshToken.update({
      where: { id: storedToken.id },
      data: { token: newRefreshToken },
    });

    return {
      access_token: newAccessToken,
      refresh_token: newRefreshToken,
      user: {
        id: storedToken.user.id,
        email: storedToken.user.email,
        role: storedToken.user.role,
      },
    };
  }
}
