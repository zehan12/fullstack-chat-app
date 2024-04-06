import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { UserModule } from './user/user.module';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { UserService } from './user/user.service';

@Module({
  imports: [UserModule, AuthModule],
  controllers: [AuthController],
  providers: [PrismaService, AuthService, UserService],
})
export class RootModule {}
