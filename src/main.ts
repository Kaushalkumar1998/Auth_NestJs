import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import * as passport from 'passport';
import { RolesGuard } from './role/roles.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
  // app.use(passport.initialize());
  // app.useGlobalGuards(new RolesGuard(new Reflector()));
}
bootstrap();
