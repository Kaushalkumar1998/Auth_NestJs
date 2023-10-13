import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Role } from 'src/role/role.enum';

@Schema({
  timestamps: true,
})
export class Auth {
  @Prop()
  userName: string;

  @Prop()
  email: string;

  @Prop()
  password: string;
  @Prop()
  role: Role;
}

export const AuthSchema = SchemaFactory.createForClass(Auth);
