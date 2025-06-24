import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { PrismaModule } from '../prisma/prisma.module';
import { GetProfileUseCase } from './use-cases/get-profile.use-case';
import { UpdateProfileUseCase } from './use-cases/update-profile.use-case';
import { ChangePasswordUseCase } from './use-cases/change-password.use-case';

@Module({
  imports: [PrismaModule],
  controllers: [ProfileController],
  providers: [
    ProfileService,
    GetProfileUseCase,
    UpdateProfileUseCase,
    ChangePasswordUseCase,
  ],
})
export class ProfileModule {}
