// course.module.ts
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CourseService } from './courses.service';
import { CourseController } from './courses.controller';
import { Course } from './courses.model';
import { Employee } from '../employees/employees.model';
import { Category } from '../category/category.model';
import { StudentCourse } from '../student_course/student_course.model';
import { Lesson } from '../lessons/lessons.model';
import { Payment } from '../payment/payment.model';

@Module({
  imports: [
    SequelizeModule.forFeature([
      Course,
      Employee,
      Category,
      StudentCourse,
      Lesson,
      Payment,
    ]),
  ],
  providers: [CourseService],
  controllers: [CourseController],
})
export class CourseModule {}
