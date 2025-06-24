import { ChangePasswordUseCase } from './use-cases/change-password.use-case';
import {
  Body,
  Controller,
  Get,
  Patch,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ResponseProfileDto } from './dto/response-profile.dto';
import { ChangePasswordDto } from './dto/change-password-profile.dto';
import { GetProfileUseCase } from './use-cases/get-profile.use-case';
import { UpdateProfileUseCase } from './use-cases/update-profile.use-case';

@ApiTags('Profile')
@ApiBearerAuth()
@Controller('profile')
@UseGuards(AuthGuard('jwt'))
export class ProfileController {
  constructor(
    private readonly getProfileUseCase: GetProfileUseCase,
    private readonly updateProfileUseCase: UpdateProfileUseCase,
    private readonly changePasswordUseCase: ChangePasswordUseCase,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Obtener el perfil del usuario autenticado' })
  @ApiResponse({ status: 200, type: ResponseProfileDto })
  getProfile(@Request() req) {
    return this.getProfileUseCase.execute(req.user.userId);
  }

  @Patch()
  @ApiOperation({ summary: 'Actualiza el perfil del usuario autenticado' })
  @ApiResponse({ status: 200, type: ResponseProfileDto })
  updateProfile(@Request() req, @Body() dto: UpdateProfileDto) {
    return this.updateProfileUseCase.execute(req.user.userId, dto);
  }

  @Patch('change-password')
  @ApiOperation({ summary: 'Cambia la contrasena del perfil autenticado' })
  @ApiResponse({ status: 200, type: ResponseProfileDto })
  change(@Request() req, @Body() dto: ChangePasswordDto) {
    return this.changePasswordUseCase.execute(req.user.userId, dto);
  }
}
