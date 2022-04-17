import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';
import Category from './Category';

@Entity()
export default class Goal extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  description!: string;

  @ManyToOne(() => Category, (category) => category.goals)
  parentCategory!: Category;

  @ManyToOne(() => Goal, (goal) => goal.goals)
  parentGoal!: Goal;

  @OneToMany(() => Goal, (goal) => goal.parentGoal)
  goals!: Goal[];

  toJson(): GoalJSON {
    return {
      id: this.id,
      name: this.name,
      description: this.description || '',
      goals: this.goals?.map((e) => e.toJson()),
    };
  }
}

interface GoalJSON {
  id: number;
  name: string;
  description: string;
  goals?: GoalJSON[];
}
