// course.model.ts
import {
  Column,
  Model,
  Table,
  DataType,
  ForeignKey,
  HasMany,
  BelongsTo,
  BelongsToMany,
} from 'sequelize-typescript';
import { StudentCourse } from '../student_course/student_course.model';
import { Lesson } from '../lessons/lessons.model';
import { Payment } from '../payment/payment.model';
import { Employee } from '../employees/employees.model';
import { Category } from '../category/category.model';
import { Student } from 'src/students/students.model';

@Table({ tableName: 'courses' })
export class Course extends Model<Course> {
  @Column({
    type: DataType.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  title: string;

  @Column({ type: DataType.STRING, allowNull: false })
  description: string;

  @ForeignKey(() => Employee) 
  @Column({ type: DataType.INTEGER })
  teacher_id: number;

  @ForeignKey(() => Category)
  @Column({ type: DataType.INTEGER })
  category_id: number;

  @Column({ type: DataType.INTEGER })
  price: number;

  @Column({ type: DataType.DATE })
  start_time: Date;

  @Column({ type: DataType.DATE })
  end_time: Date;

  @Column({ type: DataType.INTEGER })
  student_limit: number;

  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  status: boolean;

  @BelongsTo(() => Employee)
  teacher: Employee;

  @BelongsTo(() => Category)
  category: Category;
  
  @BelongsToMany(() => Student, () => StudentCourse)
  students: StudentCourse[];

  @HasMany(() => Lesson)
  lessons: Lesson[];

  @HasMany(() => Payment)
  payments: Payment[];
}
