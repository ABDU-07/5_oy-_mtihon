// homework.module.ts
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { HomeworkService } from './homework.service';
import { HomeworkController } from './homework.controller';
import { Homework } from './homework.model';
import { Lesson } from '../lessons/lessons.model';
import { Student } from '../students/students.model';

@Module({
  imports: [SequelizeModule.forFeature([Homework, Lesson, Student])],
  providers: [HomeworkService],
  controllers: [HomeworkController],
})
export class HomeworkModule {}
