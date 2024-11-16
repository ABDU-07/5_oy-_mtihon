import {
  Column,
  Model,
  Table,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
  BelongsToMany,
} from 'sequelize-typescript';
import { Course } from '../courses/courses.model';
import { Attendance } from 'src/attendance/attendance.model';
import { Student } from 'src/students/students.model';

@Table({ tableName: 'lessons' })
export class Lesson extends Model<Lesson> {
  @Column({
    type: DataType.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ForeignKey(() => Course)
  @Column({ type: DataType.BIGINT })
  course_id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  title: string;

  @Column({ type: DataType.STRING })
  task: string;

  @Column({ type: DataType.ARRAY(DataType.STRING), defaultValue: [] })
  lesson_url: string[];

  @BelongsTo(() => Course)
  course: Course;

  @BelongsToMany(() => Student, () => Attendance)
  students_in_lesson: Attendance[];
}
