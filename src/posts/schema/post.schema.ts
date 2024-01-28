import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type RegisterDocument = HydratedDocument<Posts>;

@Schema()
export class Posts {
  @Prop({ type: String, required: true })
  title: string;

  @Prop({ type: String, required: true })
  author: string;

  @Prop({ type: String, required: true })
  content: string;

  @Prop({ type: Object, required: true })
  categories: Object[];

  @Prop({ type: String })
  username: string;

  @Prop({ type: String })
  userId: string;
}

export const PostsSchema = SchemaFactory.createForClass(Posts);
