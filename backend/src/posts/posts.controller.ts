import { Controller, Get, Query, Res, HttpStatus } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PaginationDto } from './dto/pagination.dto';
import { Response } from 'express';
import axios from 'axios';
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}
  @Get()
  async findAll(
    @Query() paginationDto: PaginationDto,
    @Res() res: Response,
  ): Promise<any> {
    try {
      const { page = 1, limit = 10 } = paginationDto;
      const data = await this.postsService.findAll(+page, +limit);
      return res.status(HttpStatus.CREATED).send(data);
    } catch (error) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .send({ error: error?.message || error });
    }
  }

  @Get('bulk')
  async insertBulk(@Res() res: Response): Promise<any> {
    try {
      const isDataExist = await this.postsService.findAll(1, 5);
      if (isDataExist.length) throw Error('data exist in DB');
      const { data } = await axios.get('https://picsum.photos/v2/list');
      await this.postsService.insertBulk(data);
      return res.status(HttpStatus.CREATED).send('data inserted into DB');
    } catch (error) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .send({ error: error?.message || error });
    }
  }
}
