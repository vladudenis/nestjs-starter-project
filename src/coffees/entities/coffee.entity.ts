import {
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  JoinTable,
} from 'typeorm';
import { Flavour } from './flavour.entity';

@Entity() // sql table === 'coffee'
export class Coffee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  brand: string;

  @Column({ default: 0 })
  recommendations: number;

  @JoinTable()
  @ManyToMany(
    (type) => Flavour,
    (flavour) => flavour.coffees,
    {
      cascade: true,
    }
    )
  flavours: Flavour[];
}
