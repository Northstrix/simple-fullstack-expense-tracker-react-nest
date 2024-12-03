import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Expense {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  dateTime: Date;

  @Column()
  author: string;

  @Column('decimal')
  sum: number;

  @Column()
  category: number;

  @Column()
  comment: string;
}