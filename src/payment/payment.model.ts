// payment.model.ts
import {
  Column,
  Model,
  Table,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Student } from '../students/students.model';
import { Course } from '../courses/courses.model';

@Table({ tableName: 'payments' })
export class Payment extends Model<Payment> {
  @Column({
    type: DataType.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ForeignKey(() => Student)
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  student_id: number;

  @ForeignKey(() => Course)
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  course_id: number;

  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  amount: number;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.NOW,
  })
  payment_date: Date;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  status: boolean;

  @BelongsTo(() => Student)
  student: Student;

  @BelongsTo(() => Course)
  course: Course;
}
