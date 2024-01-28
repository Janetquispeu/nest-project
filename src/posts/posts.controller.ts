import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Query,
  Request,
  Put
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostDto } from './dto/create-post.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Body() createPostDto: PostDto,
    @Request() req
  ) {
    return this.postsService.create(createPostDto, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getAllPosts(
    @Query() query,
    @Request() req
  ) {
    return this.postsService.getAllPosts(query, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getPostById(
    @Param('id') id: string,
    @Request() req
  ) {
    return this.postsService.getPostById(id, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updatePostById(
    @Param('id') id: string,
    @Body() updatePostDto: PostDto,
    @Request() req
  ) {
    return await this.postsService.updatePostById(id, updatePostDto, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteById(
    @Param('id') id:string,
    @Request() req
  ) {
    return this.postsService.deleteById(id, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/user/:userId')
  getPostByUser(
    @Param('userId') userId: string,
    @Request() req
  ) {
    return this.postsService.getPostByUser(userId, req.user);
  }
}
