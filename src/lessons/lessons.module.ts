// lesson.module.ts
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { LessonService } from './lessons.service';
import { LessonController } from './lessons.controller';
import { Lesson } from './lessons.model';
import { Course } from '../courses/courses.model';

@Module({
  imports: [SequelizeModule.forFeature([Lesson, Course])],
  providers: [LessonService],
  controllers: [LessonController],
})
export class LessonModule {}
