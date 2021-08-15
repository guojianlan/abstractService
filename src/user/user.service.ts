import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { AbstractTypeOrmService } from '../abstract';
import { UserEntity } from './entity';

@Injectable()
export class UserService extends AbstractTypeOrmService<UserEntity> {

  constructor(@InjectRepository(UserEntity) private readonly repository: Repository<UserEntity>) {
    super(repository, UserEntity);
  }
  getUsers(): Promise<UserEntity[]> {
    throw new HttpException('asd', HttpStatus.FORBIDDEN)
  }
  // getUsersOne(): Promise<UserEntity> {
  //   return this.repository.mFindOne();
  // }
  // getUsersOneT() {
  //   return this.repository.findOne(2);
  // }
}
