import { Body, Controller, Get, Post } from '@nestjs/common';
import { WrapController } from '../abstract.typeorm.controller';

import { TagEntity } from './entity';
import { TagService } from './tag.service';

const CrudController = WrapController<TagEntity>({
  model: TagEntity,
});

@Controller('tag')
export class TagController extends CrudController {
  constructor(private readonly service: TagService) {
    super(service);
  }
  // @Post()
  // public async create(@Body() body: UserEntity) {
  //   return 'create'
  // }
}
