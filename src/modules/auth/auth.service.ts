import { RefreshTokenUseCase } from './use-cases/refresh-token.use-case';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { randomBytes } from 'crypto';
import { CreateUserDto } from 'src/modules/users/dto/create-user.dto';
import { UsersService } from 'src/modules/users/users.service';
import { PrismaService } from '../prisma/prisma.service';
import { LoginUseCase } from './use-cases/login.use-case';
import { RegisterUseCase } from './use-cases/register.use-case';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,

    private readonly loginUseCase: LoginUseCase,
    private readonly registerUseCase: RegisterUseCase,
    private readonly refreshTokenUseCase: RefreshTokenUseCase,
  ) {}

  async register(dto: CreateUserDto) {
    const { name, email, password } = dto;
    return this.registerUseCase.execute({ name, email, password });
  }

  async login(loginDto: { email: string; password: string }) {
    return this.loginUseCase.execute(loginDto);
  }

  async refreshToken(token: string) {
    if (!token) {
      throw new UnauthorizedException('Refresh token requerido');
    }
    return this.refreshTokenUseCase.execute(token);
  }
}
