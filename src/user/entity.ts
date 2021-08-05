
import { CsBaseEntity } from 'src/base.entity';
import { Column, Entity } from 'typeorm';


@Entity('users')
export class UserEntity extends CsBaseEntity {
  @Column({ length: 500 })
  name: string;

  @Column({
    default: 0,
  })
  sex: number;

  @Column({
    default: 0,
  })
  price: number;
}

