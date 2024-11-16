import {
  Column,
  Model,
  Table,
  DataType,
  ForeignKey,
} from 'sequelize-typescript';
import { Student } from '../students/students.model';
import { Course } from '../courses/courses.model';

@Table({ tableName: 'student_course' })
export class StudentCourse extends Model<StudentCourse> {
  @Column({
    type: DataType.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ForeignKey(() => Student)
  @Column({ type: DataType.BIGINT })
  student_id: number;

  @ForeignKey(() => Course)
  @Column({ type: DataType.BIGINT })
  course_id: number;
}
