import { RefreshTokenUseCase } from './use-cases/refresh-token.use-case';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from 'src/modules/users/dto/create-user.dto';
import { LoginUseCase } from './use-cases/login.use-case';
import { RegisterUseCase } from './use-cases/register.use-case';

@Injectable()
export class AuthService {
  constructor(
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
