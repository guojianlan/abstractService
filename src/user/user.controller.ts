import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { WrapController } from '../abstract';

import { UserEntity } from './entity';
import { UserService } from './user.service';

const CrudController = WrapController<UserEntity>({
  model: UserEntity,
  afterFunctions: {
    findOne: (result) => {

      return result

    }
  }
});

@Controller('user')
export class UserController extends CrudController {
  constructor(private readonly service: UserService) {
    super(service);
  }

  @Get(':id/:test')
  async UsersIdTest() {
    return this.service.getUsers()
  }
  // @Get()
  // public Users() {
  //   console.log(12313);
  //   return this.service.getUsers();
  // }
  // @Post()
  // public async create(@Body() body: UserEntity) {
  //   return 'create'
  // }
}
