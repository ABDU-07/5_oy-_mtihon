// attendance.module.ts
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AttendanceService } from './attendance.service';
import { AttendanceController } from './attendance.controller';
import { Attendance } from './attendance.model';
import { Lesson } from '../lessons/lessons.model';
import { Student } from '../students/students.model';

@Module({
  imports: [SequelizeModule.forFeature([Attendance, Lesson, Student])],
  providers: [AttendanceService],
  controllers: [AttendanceController],
})
export class AttendanceModule {}
