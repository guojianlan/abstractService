import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectWinston, Logger } from 'src/logger';
import { Repository, SelectQueryBuilder } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectWinston() private readonly logger: Logger
  ) { }
  getUsers() {
    this.logger.log('123')
    throw new HttpException('asd', HttpStatus.FORBIDDEN)
  }
  // getUsersOne(): Promise<UserEntity> {
  //   return this.repository.mFindOne();
  // }
  // getUsersOneT() {
  //   return this.repository.findOne(2);
  // }
}
