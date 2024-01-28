import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type RegisterDocument = HydratedDocument<Register>;

@Schema()
export class Register {
  @Prop({ type: String, required: true })
  password: string;

  @Prop({ type: String, required: true })
  username: string;

  @Prop({ type: Boolean, required: true })
  isAdmin: boolean;
}

export const RegisterSchema = SchemaFactory.createForClass(Register);
