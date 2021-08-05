import { BadRequestException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { AbstractTypeOrmService } from '../abstract.typeorm.service';
import { UserEntity, UserRepository } from '../user';


@Injectable()
export class UserService extends AbstractTypeOrmService<UserEntity> {
  constructor(
    private readonly repository: UserRepository,
  ) {
    super(repository, UserEntity);
  }
  public async findOne(id: number): Promise<UserEntity> | never {
    return await this.queryBuilder()
      .andWhere('id=:id', { id })
      .select(['model.name', 'model.id'])
      .limit(1)
      .getOneOrFail();
  }
  getUsers(): Promise<UserEntity[]> {
    return this.repository.mfind()
  }

}
