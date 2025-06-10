import {
  Body,
  Controller,
  Get,
  Headers,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { type Request } from 'express';

@Controller({
  path: 'movies',
})
export class MovieController {
  constructor(private readonly movieService: MovieService) {}
  @Get()
  findAll(@Query() query: any) {
    return `Find all movies: ${JSON.stringify(query)}`;
  }

  @Post()
  create(@Body('title') title: string) {
    return `Create movie: ${title}`;
  }

  @Get('headers')
  getHeaders(@Headers() headers: any) {
    return `Get headers: ${JSON.stringify(headers)}`;
  }

  @Get('user-agent')
  getUserAgent(@Headers('user-agent') userAgent: string) {
    return `Get user-agent: ${userAgent}`;
  }

  @Get('request')
  getRequestDetails(@Req() req: Request) {
    return `Get request details: ${JSON.stringify(req)}`;
  }
}
