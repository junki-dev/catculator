import { Ages } from '@common/constants';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'feed' })
export class Feed {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  company: string;

  @Column()
  ages: Ages;

  @Column()
  name: string;

  @Column()
  flavor: string;

  @Column()
  kcal: number;

  @Column({ name: 'is_wet' })
  isWet: boolean;
}
