import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { UserModule } from './user/user.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UserModule, UsersModule],
  controllers: [],
  providers: [PrismaService],
})
export class RootModule {}
