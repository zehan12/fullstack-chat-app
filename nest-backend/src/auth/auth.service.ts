import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { LoginUserDto } from './dto/login-user.dto';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

const EXPIRY_TIME = 3600 * 1000 * 24 * 7; // 1 hour * 24 hours/day * 7 days = 1 week in milliseconds

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(dto: LoginUserDto) {
    const user = await this.validateUser(dto);
    const payload = {
      email: user.email,
      sub: {
        name: user.name,
      },
    };

    return {
      user,
      tokens: {
        accessToken: await this.jwtService.signAsync(payload, {
          expiresIn: this.configService.get('jwt.accessToken.expiresIn'),
          secret: this.configService.get('jwt.accessToken.secretKey'),
        }),
        refreshToken: await this.jwtService.signAsync(payload, {
          expiresIn: this.configService.get('jwt.refreshToken.expiresIn'),
          secret: this.configService.get('jwt.refreshToken.secretKey'),
        }),
        expiresIn: new Date().setTime(new Date().getTime() + EXPIRY_TIME),
      },
    };
  }

  async validateUser(dto: LoginUserDto) {
    const user = await this.userService.findByEmail(dto.email);
    if (user && (await compare(dto.password, user.password))) {
      user.password = '*********';
      return user;
    }

    throw new UnauthorizedException('user or password is not correct');
  }

  async refreshToken(user: any) {
    const payload = {
      email: user.email,
      sub: {
        name: user.name,
        sub: user.sub,
      },
    };
    return {
      tokens: {
        accessToken: await this.jwtService.signAsync(payload, {
          expiresIn: this.configService.get('jwt.accessToken.expiresIn'),
          secret: this.configService.get('jwt.accessToken.secretKey'),
        }),
        refreshToken: await this.jwtService.signAsync(payload, {
          expiresIn: this.configService.get('jwt.refreshToken.expiresIn'),
          secret: this.configService.get('jwt.refreshToken.secretKey'),
        }),
        expiresIn: new Date().setTime(new Date().getTime() + EXPIRY_TIME),
      },
    };
  }
}
