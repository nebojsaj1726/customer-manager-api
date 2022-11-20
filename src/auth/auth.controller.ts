import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { UserDto } from 'src/user/dto/user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(@Body() user: UserDto) {
    return this.authService.register(user);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() user: UserDto) {
    return this.authService.login(user);
  }
}
