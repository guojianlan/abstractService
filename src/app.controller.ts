
import { Body, Controller, Get, Post } from '@nestjs/common';
import { WrapController } from './abstract.typeorm.controller';
import { AppService } from './app.service';
import { UserEntity } from './user';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {

  }
  @Get()
  public test() {
    return this.appService.getHello()
  }
}
