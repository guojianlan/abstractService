import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AbstractTypeOrmService } from '../abstract/typeorm.service';
import { TagEntity, } from './entity';

@Injectable()
export class TagService extends AbstractTypeOrmService<TagEntity> {
  constructor(@InjectRepository(TagEntity) private readonly repository: Repository<TagEntity>) {
    super(repository, TagEntity);
  }
}
