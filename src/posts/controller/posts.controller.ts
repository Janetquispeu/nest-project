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
import { ApiBearerAuth, ApiBody, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PostsService } from '../service/posts.service';
import { PostDto } from '../dto/create-post.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'The create post was successfully.'})
  @ApiResponse({ status: 401, description: 'Unauthorized'})
  @ApiBody({ type: PostDto })
  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Body() createPostDto: PostDto,
    @Request() req
  ) {
    return this.postsService.create(createPostDto, req.user);
  }

  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Return all posts'})
  @ApiResponse({ status: 401, description: 'Unauthorized'})
  @ApiQuery({ name: 'page', example: '0' })
  @ApiQuery({ name: 'rows', example: '10' })
  @ApiQuery({ name: 'title', example: 'Posts 2' })
  @ApiQuery({ name: 'content', example: 'Hello' })
  @ApiQuery({ name: 'author', example: 'test2' })
  @ApiQuery({ name: 'categories', example: 'travel, personal' })
  @UseGuards(JwtAuthGuard)
  @Get()
  getAllPosts(
    @Query() query,
    @Request() req
  ) {
    return this.postsService.getAllPosts(query, req.user);
  }

  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'ok'})
  @ApiResponse({ status: 401, description: 'Unauthorized'})
  @ApiParam({ name: 'id' })
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getPostById(
    @Param('id') id: string,
    @Request() req
  ) {
    return this.postsService.getPostById(id, req.user);
  }

  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'ok'})
  @ApiResponse({ status: 401, description: 'Unauthorized'})
  @ApiParam({ name: 'id' })
  @ApiBody({ type: PostDto })
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updatePostById(
    @Param('id') id: string,
    @Body() updatePostDto: PostDto,
    @Request() req
  ) {
    return await this.postsService.updatePostById(id, updatePostDto, req.user);
  }

  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'ok'})
  @ApiResponse({ status: 401, description: 'Unauthorized'})
  @ApiParam({ name: 'id' })
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteById(
    @Param('id') id:string,
    @Request() req
  ) {
    return this.postsService.deleteById(id, req.user);
  }

  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'ok'})
  @ApiResponse({ status: 401, description: 'Unauthorized'})
  @UseGuards(JwtAuthGuard)
  @Get('/user/:userId')
  getPostByUser(
    @Param('userId') userId: string,
    @Request() req
  ) {
    return this.postsService.getPostByUser(userId, req.user);
  }

  @ApiBearerAuth()
  @ApiResponse({ status: 403, description: 'Acceso denegado. No eres administrador.'})
  @ApiResponse({ status: 200, description: 'Se obtuvieron los usuarios admin satisfactoriamente.'})
  @ApiResponse({ status: 401, description: 'Unauthorized'})
  @UseGuards(JwtAuthGuard)
  @Get('/admin/users')
  getAllUser() {
    return this.postsService.getAllUser();
  }

  @ApiBearerAuth()
  @ApiResponse({ status: 403, description: 'Acceso denegado. No eres administrador.'})
  @ApiResponse({ status: 200, description: 'Se eliminó el usuario correctamente.'})
  @ApiResponse({ status: 401, description: 'Unauthorized'})
  @UseGuards(JwtAuthGuard)
  @Delete('/admin/users/:id')
  deleteAdminById(@Param('id') id: string) {
    return this.postsService.deleteAdminById(id);
  }

  @ApiBearerAuth()
  @ApiResponse({ status: 403, description: 'Acceso denegado. No eres administrador.'})
  @ApiResponse({ status: 200, description: 'Se obtuvieron los posts correctamente.'})
  @ApiResponse({ status: 401, description: 'Unauthorized'})
  @UseGuards(JwtAuthGuard)
  @Get('/admin/posts')
  getAllPostsAdmin() {
    return this.postsService.getAllPostsAdmin();
  }
}
