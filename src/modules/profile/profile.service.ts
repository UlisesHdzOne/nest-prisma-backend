import { Injectable } from '@nestjs/common';
import { GetProfileUseCase } from './use-cases/get-profile.use-case';
import { UpdateProfileUseCase } from './use-cases/update-profile.use-case';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ChangePasswordDto } from './dto/change-password-profile.dto';
import { ChangePasswordUseCase } from './use-cases/change-password.use-case';

@Injectable()
export class ProfileService {
  constructor(
    private readonly getProfileUseCase: GetProfileUseCase,
    private readonly updateProfileUseCase: UpdateProfileUseCase,
    private readonly changeProfileUseCase: ChangePasswordUseCase,
  ) {}

  getProfile(userId: number) {
    return this.getProfileUseCase.execute(userId);
  }

  updateProfile(userId: number, dto: UpdateProfileDto) {
    return this.updateProfileUseCase.execute(userId, dto);
  }

  changePasswordProfile(userId: number, dto: ChangePasswordDto) {
    return this.changeProfileUseCase.execute(userId, dto);
  }
}
