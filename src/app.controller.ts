import { Query } from '@nestjs/common';
import { Controller, Get, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppService } from './app.service';
import { UserEntity } from './user/entities/user.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello(@Query() query: any): Promise<any> {
    return this.appService.find(query);
  }
  @Get(':id')
  async getId(@Param('id') id: number): Promise<any> {
    return this.appService.findOne(id);
  }
}
