import { IsNumber, IsOptional, IsString } from 'class-validator';
import { CsBaseEntity } from 'src/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('users')
export class UserEntity extends CsBaseEntity {
  @IsString()
  @Column({ length: 500 })
  name: string;
  @IsNumber()
  @IsOptional()
  @Column({
    default: 0,
  })
  sex: number;
  @IsNumber()
  @IsOptional()
  @Column({
    default: 0,
  })
  price: number;
}
