import { Injectable } from '@nestjs/common';
import { GetProfileUseCase } from './use-cases/get-profile.use-case';
import { UpdateProfileUseCase } from './use-cases/update-profile.use-case';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class ProfileService {
  constructor(
    private readonly getProfileUseCase: GetProfileUseCase,
    private readonly updateProfileUseCase: UpdateProfileUseCase,
  ) {}

  getProfile(userId: number) {
    return this.getProfileUseCase.execute(userId);
  }

  updateProfile(userId: number, dto: UpdateProfileDto) {
    return this.updateProfileUseCase.execute(userId, dto);
  }
}
