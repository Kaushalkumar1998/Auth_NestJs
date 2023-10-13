import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignUpAuthDto } from './dto/signup-auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Auth } from './entities/auth.entity';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginAuthDto } from './dto/login-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Auth.name) private userModel: Model<Auth>,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpAuthDto: SignUpAuthDto): Promise<{ token: string }> {
    const { userName, email, password, role } = signUpAuthDto;
    const hashPassword = await bcrypt.hash(password, 10);

    const user = await this.userModel.create({
      userName,
      password: hashPassword,
      email,
      role,
    });

    const token = this.jwtService.sign({
      id: user._id,
    });
    return { token };
  }

  async login(loginAuthDto: LoginAuthDto): Promise<{
    token: string;
  }> {
    const { email, password } = loginAuthDto;
    console.log(loginAuthDto);

    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new UnauthorizedException('Invalid Email or Password');
    }

    const IspasswordMatched = await bcrypt.compare(password, user.password);

    if (!IspasswordMatched) {
      throw new UnauthorizedException('Invalid Email or Password');
    }

    const token = this.jwtService.sign({
      id: user._id,
    });

    return { token };
  }
}
