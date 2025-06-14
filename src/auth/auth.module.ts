import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from '../prisma/prisma.module'; // Importa PrismaModule

@Module({
  imports: [PrismaModule, 
  JwtModule.register({ 
      secret: 'mi_clave_secreta',  // cámbiala por algo seguro
      signOptions: { expiresIn: '1h' }, // token dura 1 hora
   })],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
