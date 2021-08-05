import { Column, Entity, EntityRepository, FindConditions, FindManyOptions, PrimaryGeneratedColumn, Repository } from 'typeorm';
import { IsString, IsInt } from 'class-validator';
import { CSBaseEntity } from 'src/base.entity';
import { WrapAbstractTypeOrmRepostry } from 'src/abstract.typeorm.repostry';
@Entity('users')
export class UserEntity extends CSBaseEntity {

  @IsString()
  @Column({ length: 500 })
  name: string;

  @IsInt()
  @Column({
    default: 0,
  })
  sex: number;

  @IsInt()
  @Column({
    default: 0,
  })
  price: number;
}

