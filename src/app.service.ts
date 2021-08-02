import { BadRequestException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AbstractTypeOrmService } from './abstract.typeorm.service';
import { UserEntity } from './user/entities/user.entity';

@Injectable()
export class AppService extends AbstractTypeOrmService<UserEntity> {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {
    super(userRepository);
  }
  public async findOne(id: number): Promise<UserEntity> | never {
    return await this.queryBuilder()
      .andWhere('id=:id', { id })
      .select(['model.name', 'model.id'])
      .limit(1)
      .getOneOrFail();
  }
  getHello(): string {
    return 'Hello Worl222222222d!';
  }
}
