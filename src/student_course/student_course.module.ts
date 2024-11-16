// student_course.module.ts
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { StudentCourseService } from './student_course.service';
import { StudentCourseController } from './student_course.controller';
import { StudentCourse } from './student_course.model';
import { Student } from '../students/students.model';
import { Course } from '../courses/courses.model';

@Module({
  imports: [SequelizeModule.forFeature([StudentCourse, Student, Course])],
  providers: [StudentCourseService],
  controllers: [StudentCourseController],
})
export class StudentCourseModule {}
