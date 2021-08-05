import { Column, Entity, EntityRepository, FindConditions, FindManyOptions, PrimaryGeneratedColumn, Repository } from 'typeorm';
import { IsString, IsInt } from 'class-validator';
import { CSBaseEntity } from 'src/base.entity';
import { UserEntity } from 'src/user';


@Entity('article')
export class ArticleEntity extends CSBaseEntity {

    @IsString()
    @Column({ length: 500 })
    title: string;

    @IsInt()
    @Column({ default: 0 })
    user_id: number

    anthor!: UserEntity
}

