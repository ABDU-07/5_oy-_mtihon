import { Column, Model, Table, DataType, HasMany, BelongsToMany } from 'sequelize-typescript';
import { StudentCourse } from '../student_course/student_course.model';
import { Attendance } from '../attendance/attendance.model';
import { Homework } from '../homework/homework.model';
import { Payment } from '../payment/payment.model';
import { Course } from 'src/courses/courses.model';
import { Lesson } from 'src/lessons/lessons.model';

@Table({ tableName: 'students' })
export class Student extends Model<Student> {
  @Column({
    type: DataType.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  first_name: string;

  @Column({ type: DataType.STRING, allowNull: false })
  second_name: string;

  @Column({ type: DataType.INTEGER, unique: true, allowNull: false })
  student_id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @Column({ type: DataType.STRING })
  phoneNumber: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  status: boolean;

  @BelongsToMany(() => Course, () => StudentCourse)
  courses: StudentCourse[];


  @BelongsToMany(() => Lesson, () => Attendance)
  attendances: Attendance[];

  @HasMany(() => Homework)
  homeworks: Homework[];

  @HasMany(() => Payment)
  payments: Payment[];
}
