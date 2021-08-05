
import { Body, Controller, Get, Post } from '@nestjs/common';
import { WrapController } from '../abstract.typeorm.controller';

import { UserEntity } from '../user';
import { UserService } from './user.service';

const CrudController = WrapController<UserEntity>({
    model: UserEntity,

})

@Controller('user')
export class UserController extends CrudController {
    constructor(private readonly service: UserService) {
        super(service)
    }
    @Get()
    public Article() {
        console.log(12313);
        return this.service.getUsers()
    }
    // @Post()
    // public async create(@Body() body: UserEntity) {
    //   return 'create'
    // }
}
