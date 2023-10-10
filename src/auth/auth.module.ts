import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Auth, AuthSchema } from './entities/auth.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Jwtstrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          secret: config.get<string>('JWT_SECRET'),
          signOptions: { expiresIn: config.get('JWT_EXPIRE') },
        };
      },
    }),
    MongooseModule.forFeature([{ name: Auth.name, schema: AuthSchema }]),
  ],

  controllers: [AuthController],
  providers: [AuthService, Jwtstrategy],
  exports: [Jwtstrategy, PassportModule],
})
export class AuthModule {}
