import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

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
  role: string;
}

export const AuthSchema = SchemaFactory.createForClass(Auth);
