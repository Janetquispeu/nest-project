import { Model } from 'mongoose';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Register } from 'src/auth/schema/auth.schema';
import { PostDto } from '../dto/create-post.dto';
import { Posts } from '../schema/post.schema';
import { User } from 'src/types/user';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Posts.name) private postsModel: Model<Posts>,
    @InjectModel(Register.name) private registerModel: Model<Register>,
  ) {}

  async getUserDataByUser(req) {
    const findUser = await this.registerModel.findOne({ username: req.username }).exec();
    return { findUser };
  }

  async getPostDataByPostId(id) {
    const findPost = await this.postsModel.findOne({ _id: id }).exec();
    return { findPost };
  }

  async create(createPostDto: PostDto, req: User): Promise<Posts> {
    const { findUser } = await this.getUserDataByUser(req);

    let body = {
      ...createPostDto,
      username: findUser.username,
      userId: findUser._id.toString()
    };

    const newPosts = new this.postsModel(body);
    return newPosts.save();
  }

  async getAllPosts(
    query = { page: 0, rows: 10, title: '', content: '', author: '', categories: ''},
    req
  ) {
    const { findUser } = await this.getUserDataByUser(req);
    const { title, content, author, categories } = query;
    const filter: any = {};

    if (!findUser.isAdmin) {
      filter.username = { $regex: new RegExp(req.username, 'i') };
    }

    if (title) {
      filter.title = { $regex: new RegExp(title, 'i') };
    }

    if (content) {
      filter.content = { $regex: new RegExp(content, 'i') };
    }

    if (author) {
      filter.author = { $regex: new RegExp(author, 'i') };
    }

    if (categories && categories.length > 0) {
      filter.categories = { $elemMatch: { $in: categories.split(',') } };
    }

    const users = await this.postsModel.find(filter)
      .skip(query.page * query.rows)
      .limit(query.rows)
      .exec();

    return {
      data: users,
      page_total_row: users.length,
      status: 200,
    };
  }

  async getPostById(id: string, req: User) {
    const newPosts = await this.postsModel.findOne({ _id: id, username: req.username }).exec();

    if (newPosts) {
      return newPosts;
    } else {
      return {
        message: `No found posts with id ${id}`
      }
    }
  }

  async updatePostById(id: string, updatePostDto: PostDto, req): Promise<Posts> {
    const { findUser } = await this.getUserDataByUser(req);
    const { findPost } = await this.getPostDataByPostId(id);

    if ((findPost._id.toString() === id && findPost.username === findUser.username) || findUser.isAdmin) {
      return await this.postsModel.findByIdAndUpdate(
        { _id: id },
        { $set: { ...updatePostDto, _id: undefined, username: undefined }},
        { new: true }
      );
    } else {
      throw new UnauthorizedException();
    }
  }

  async deleteById(id: string, req) {
    const { findUser } = await this.getUserDataByUser(req);
    const { findPost } = await this.getPostDataByPostId(id);

    if ((findPost.username === findUser.username) || findUser.isAdmin) {
      return this.postsModel.findByIdAndDelete({ _id: id }).lean();
    } else {
      throw new UnauthorizedException();
    }
  }

  async getPostByUser(userId, req) {
    const { findUser } = await this.getUserDataByUser(req);

    if (findUser._id.toString() === userId || findUser.isAdmin) {
      return this.postsModel.find({ userId: userId });
    } else {
      throw new UnauthorizedException();
    }
  }

  async getAllUser() {
    return this.registerModel.find({ isAdmin: true }).exec();
  }

  async deleteAdminById(id: string) {
    const data = await this.registerModel.findByIdAndDelete({ _id: id }).lean();

    return {
      message: "Se elimino el usuario correctamente.",
      data 
    };
  }

  async getAllPostsAdmin() {
    const data =  await this.postsModel.find().exec();

    return {
      message: "Se obtuvieron los posts correctamente.",
      data
    };
  }
}
