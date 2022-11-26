import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { UserDto } from 'src/user/dto/user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async hashPassword(password: string) {
    return bcrypt.hash(password, 12);
  }

  async register(user: Readonly<UserDto>) {
    const { firstName, email, password } = user;
    const existingUser = await this.userService.findByEmail(email);
    if (existingUser) {
      throw new BadRequestException('Email taken');
    }
    const hashedPassword = await this.hashPassword(password);
    await this.userService.create(firstName, email, hashedPassword);
    return { message: 'User successfully registered' };
  }

  async passwordMatch(password: string, hashedPassword: string) {
    return bcrypt.compare(password, hashedPassword);
  }

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const passwordMatch = await this.passwordMatch(password, user.password);
    if (!passwordMatch) {
      throw new BadRequestException('Invalid credentials');
    }
    return this.userService.getUser(user);
  }

  async login(existingUser: UserDto) {
    const { email, password } = existingUser;
    const user = await this.validateUser(email, password);
    const jwt = await this.jwtService.signAsync({ user });
    return { token: jwt };
  }
}
