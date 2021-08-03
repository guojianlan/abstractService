import { Column, PrimaryGeneratedColumn } from 'typeorm';
export abstract class AbstractTypeOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    default: 0,
  })
  create_at: number;
  @Column({
    default: 0,
  })
  update_at: number;
  @Column({
    default: 0,
  })
  delete_at: number;
}
