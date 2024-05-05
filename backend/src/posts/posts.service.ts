import { Injectable } from '@nestjs/common';
import { Posts } from './schemas/posts.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Posts.name) private readonly postsModel: Model<Posts>,
  ) {}
  // get posts with pagination
  async findAll(page: number, limit: number): Promise<Posts[]> {
    const skip = (page - 1) * limit;
    return await this.postsModel.find().skip(skip).limit(limit).exec();
  }
  // insert multiple records
  async insertBulk(images: Posts[]): Promise<any> {
    return await this.postsModel.insertMany(images);
  }

  async filter(author: string): Promise<any> {
    return await this.postsModel.find({ author }).exec();
  }

  // async create(user: Posts): Promise<Posts> {
  //   const newUser = new this.postsModel(user);
  //   return newUser.save();
  // }
  // async update(id: string, user: Posts): Promise<Posts> {
  //   return this.postsModel.findByIdAndUpdate(id, user, { new: true }).exec();
  // }
  // async delete(id: string): Promise<Posts> {
  //   return this.postsModel.findByIdAndDelete(id).exec();
  // }
}
