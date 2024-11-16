// submission-homework.module.ts
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SubmissionHomeworkService } from './submission_homework.service';
import { SubmissionHomeworkController } from './submission_homework.controller';
import { SubmissionHomework } from './submission_homework.model';
import { Homework } from '../homework/homework.model';

@Module({
  imports: [SequelizeModule.forFeature([SubmissionHomework, Homework])],
  controllers: [SubmissionHomeworkController],
  providers: [SubmissionHomeworkService],
})
export class SubmissionHomeworkModule {}
