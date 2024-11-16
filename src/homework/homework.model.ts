// homework.model.ts
import {
  Column,
  Model,
  Table,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import { Lesson } from '../lessons/lessons.model';
import { Student } from '../students/students.model';
import { SubmissionHomework } from 'src/submission_homework/submission_homework.model';

@Table({ tableName: 'homework' })
export class Homework extends Model<Homework> {
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

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  text: string;

  @Column({
    type: DataType.ARRAY(DataType.STRING),
    allowNull: true,
    defaultValue: [],
  })
  homeworkUrl: string[];

  @BelongsTo(() => Lesson)
  lesson: Lesson;

  @HasMany(() => SubmissionHomework)
  submissions: SubmissionHomework[];

  @BelongsTo(() => Student)
  student: Student;
}
