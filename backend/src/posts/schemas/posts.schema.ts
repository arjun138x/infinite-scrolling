import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Posts extends Document {
  @Prop()
  id: string;

  @Prop()
  author: string;

  @Prop()
  width: number;

  @Prop()
  height: number;

  @Prop()
  url: string;

  @Prop()
  download_url: string;
}

export const PostsSchema = SchemaFactory.createForClass(Posts);
