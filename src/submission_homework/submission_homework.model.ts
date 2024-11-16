// submission_homework.model.ts
import {
  Column,
  Model,
  Table,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Homework } from '../homework/homework.model';

@Table({ tableName: 'submission_homework' })
export class SubmissionHomework extends Model<SubmissionHomework> {
  @Column({
    type: DataType.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ForeignKey(() => Homework)
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  homeworkId: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  ball: number;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  comment: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  status: boolean;

  @BelongsTo(() => Homework)
  homework: Homework;
}
