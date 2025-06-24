import { Injectable } from '@nestjs/common';
import { GetProfileUseCase } from './use-cases/get-profile.use-case';

@Injectable()
export class ProfileService {
  constructor(private readonly getProfileUseCase: GetProfileUseCase) {}

  getProfile(userId: number) {
    return this.getProfileUseCase.execute(userId);
  }
}
