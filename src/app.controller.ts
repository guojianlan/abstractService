
import { Body, Controller, Post } from '@nestjs/common';
import { WrapController } from './abstract.typeorm.controller';
import { AppService } from './app.service';
import { UserEntity } from './user/entities/user.entity';

const CrudController = WrapController<UserEntity>({
  model: UserEntity,
  decorators: {
    findAll: []
  }
})

@Controller()
export class AppController extends CrudController {
  constructor(private readonly appService: AppService) {
    super(appService)
  }

  // @Post()
  // public async create(@Body() body: UserEntity) {
  //   return 'create'
  // }
}
