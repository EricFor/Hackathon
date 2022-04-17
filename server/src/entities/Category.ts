import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, OneToMany, ManyToMany, ManyToOne } from 'typeorm';
import Goal from './Goal';
import User from './User';

@Entity()
export default class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, (u) => u.categories)
  owner!: User;

  @Column()
  name!: string;

  @OneToMany(() => Goal, (goal) => goal.parentCategory, {
    onDelete: 'CASCADE'
  })
  goals!: Goal[];

  toJson() {
    return {
      id: this.id,
      name: this.name,
      goals: this.goals?.map((e) => e.toJson()),
    };
  }
}
