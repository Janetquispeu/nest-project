
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type RegisterDocument = HydratedDocument<Register>;

@Schema()
export class Register {
  @Prop({ type: String })
  name: string;

  @Prop({ type: String, required: true })
  password: string;

  @Prop({ type: String, required: true })
  userName: string;
}

export const RegisterSchema = SchemaFactory.createForClass(Register);
