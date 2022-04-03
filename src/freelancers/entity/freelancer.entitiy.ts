import { Exclude } from 'class-transformer';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('freelancer')
export class Freelancer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  @Exclude({ toPlainOnly: true })
  password: string;

  @Column()
  username: string;

  @Column()
  phone_number: string;

  @Column()
  skillsets: string;

  @Column()
  hobby: string;
}
