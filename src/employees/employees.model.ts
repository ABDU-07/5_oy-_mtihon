import {
  Column,
  Model,
  Table,
  DataType,
  HasMany,
  ForeignKey,
} from 'sequelize-typescript';
import { Course } from '../courses/courses.model';

@Table({ tableName: 'employees' })
export class Employee extends Model<Employee> {
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

  @ForeignKey(() => Course)
  @Column({ type: DataType.INTEGER, unique: true, allowNull: false })
  employeeId: number;

  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @Column({
    type: DataType.ENUM('teacher', 'admin', 'staff'),
    allowNull: false,
  })
  role: 'teacher' | 'admin' | 'staff';

  @Column({ type: DataType.STRING })
  phoneNumber: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  status: boolean;

  @HasMany(() => Course, { foreignKey: 'teacher_id' })
  courses: Course[];
}
