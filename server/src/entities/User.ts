import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import Category from './Category';

@Entity()
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  username!: string;

  @Column()
  password!: string;

  @OneToMany(() => Category, (c) => c.owner)
  categories!: Category[];

  toJson() {
    return {
      id: this.id,
      username: this.username,
    };
  }
}
