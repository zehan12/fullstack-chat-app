import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { LoginUserDto } from './dto/login-user.dto';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async login() {}

  async validateUser(dto: LoginUserDto) {
    const user = await this.userService.findByEmail(dto.email);
    if (user && (await compare(dto.password, user.password))) {
      user.password = '*********';
      return user;
    }

    throw new UnauthorizedException('user or password is not correct');
  }
}
