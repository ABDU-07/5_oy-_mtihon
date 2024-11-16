// attendance.model.ts
import {
  Column,
  Model,
  Table,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Lesson } from '../lessons/lessons.model';
import { Student } from '../students/students.model';

@Table({ tableName: 'attendance' })
export class Attendance extends Model<Attendance> {
  @Column({
    type: DataType.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ForeignKey(() => Lesson)
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  lessonId: number;

  @ForeignKey(() => Student)
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  studentId: number;

  @BelongsTo(() => Lesson)
  lesson: Lesson;

  @BelongsTo(() => Student)
  student: Student;
  
}
