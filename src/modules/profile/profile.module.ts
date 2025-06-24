import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { PrismaModule } from '../prisma/prisma.module';
import { GetProfileUseCase } from './use-cases/get-profile.use-case';

@Module({
  imports: [PrismaModule],
  controllers: [ProfileController],
  providers: [ProfileService, GetProfileUseCase],
})
export class ProfileModule {}
