// students.module.ts
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { Student } from './students.model';
import { StudentCourse } from '../student_course/student_course.model';
import { Attendance } from '../attendance/attendance.model';
import { Homework } from '../homework/homework.model';
import { Payment } from '../payment/payment.model';

@Module({
  imports: [
    SequelizeModule.forFeature([
      Student,
      StudentCourse,
      Attendance,
      Homework,
      Payment,
    ]),
  ],
  providers: [StudentsService],
  controllers: [StudentsController],
})
export class StudentsModule {}
