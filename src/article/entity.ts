import { Column, Entity } from 'typeorm';
import { IsString, IsInt } from 'class-validator';
import { AbstractTypeEntity } from '../abstract/typeorm.base.entity';
import { UserEntity } from '../user/entity';

@Entity('article')
export class ArticleEntity extends AbstractTypeEntity {
  @IsString()
  @Column({ length: 500 })
  title: string;

  @IsInt()
  @Column({ default: 0 })
  user_id: number;

  anthor!: UserEntity;
}
