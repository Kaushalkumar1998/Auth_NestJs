import { Controller, Post, Body, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { SignUpAuthDto } from './dto/signup-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() signUpAuthDto: SignUpAuthDto): Promise<{ token: string }> {
    return this.authService.signUp(signUpAuthDto);
  }

  @Get('/login')
  login(@Body() loginAuthDto: LoginAuthDto): Promise<{ token: string }> {
    return this.authService.login(loginAuthDto);
  }
}
