import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AbstractTypeOrmService } from '../abstract/typeorm.service';
import { ArticleEntity } from './entity';

@Injectable()
export class ArticleService extends AbstractTypeOrmService<ArticleEntity> {
  constructor(@InjectRepository(ArticleEntity) private readonly repository: Repository<ArticleEntity>) {
    super(repository, ArticleEntity, {
      deleteAfterAction: 'log_time'
    });
  }

  // public async findOne(id: number): Promise<ArticleEntity> | never {
  //   return await this.queryBuilder()
  //     .andWhere('id=:id', { id })
  //     .select(['model.name', 'model.id'])
  //     .limit(1)
  //     .getOneOrFail();
  // }
  // getArticle(): Promise<ArticleEntity[]> {
  //   return this.repository.mFind();
  // }
}
