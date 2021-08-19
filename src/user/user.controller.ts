import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
@Controller('user')
export class UserController {
  constructor(private readonly service: UserService) {
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
