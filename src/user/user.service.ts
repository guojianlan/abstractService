import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AbstractTypeOrmService } from '../abstract/typeorm.service';
import { UserEntity } from './entity';

@Injectable()
export class UserService extends AbstractTypeOrmService<UserEntity> {

  constructor(@InjectRepository(UserEntity) private readonly repository: Repository<UserEntity>) {
    super(repository, UserEntity);
  }
  // getUsers(): Promise<UserEntity[]> {
  //   return this.repository.mFind();
  // }
  // getUsersOne(): Promise<UserEntity> {
  //   return this.repository.mFindOne();
  // }
  // getUsersOneT() {
  //   return this.repository.findOne(2);
  // }
}
