// category.module.ts
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { Category } from './category.model';
import { Course } from '../courses/courses.model';

@Module({
  imports: [SequelizeModule.forFeature([Category, Course])],
  providers: [CategoryService],
  controllers: [CategoryController],
})
export class CategoryModule {}
