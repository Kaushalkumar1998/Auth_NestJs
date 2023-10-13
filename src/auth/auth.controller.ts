import { Controller, Post, Body } from '@nestjs/common';
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

  @Post('/login')
  login(@Body() loginAuthDto: LoginAuthDto): Promise<{ token: string }> {
    return this.authService.login(loginAuthDto);
  }
}
