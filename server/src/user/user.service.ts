import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateUserDto) {
    const userExits = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (userExits) throw new ConflictException('email duplicate');
    const newUser = await this.prisma.user.create({
      data: { ...dto, password: await hash(dto.password, 10) },
    });
    newUser.password = '**********';
    return newUser;
  }
}
