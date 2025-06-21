import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { ApiBody } from '@nestjs/swagger';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from 'src/modules/users/dto/create-user.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Registrar nuevo usuario sin rol' })
  @ApiResponse({
    status: 201,
    description: 'Usuario registrado correctamente.',
  })
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login para el usuario' })
  @ApiResponse({
    status: 200,
    description: 'Usuario autentificado correctamente',
  })
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('refresh')
  @ApiOperation({ summary: 'Refrescar token de acceso usando refresh token' })
  @ApiResponse({
    status: 200,
    description: 'Nuevo token generado correctamente',
  })
  @ApiBody({ type: RefreshTokenDto })
  async refreshToken(@Body() body: RefreshTokenDto) {
    if (!body.refresh_token) {
      throw new UnauthorizedException('Refresh token requerido');
    }
    return this.authService.refreshToken(body.refresh_token);
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Acción exclusiva para administradores',
    description:
      'Endpoint que solo puede ser accedido por usuarios con rol admin.',
  })
  @ApiResponse({ status: 201, description: 'Acción ejecutada con éxito.' })
  @ApiResponse({ status: 401, description: 'No autorizado.' })
  @ApiResponse({ status: 403, description: 'Acceso prohibido, solo admins.' })
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  @Post('admin-action')
  async adminAction() {
    return { message: 'Solo admins pueden ver esto' };
  }
}
