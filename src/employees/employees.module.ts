// employee.module.ts
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { EmployeeService } from './employees.service';
import { EmployeeController } from './employees.controller';
import { Employee } from './employees.model';
import { Course } from '../courses/courses.model';

@Module({
  imports: [SequelizeModule.forFeature([Employee, Course])],
  providers: [EmployeeService],
  controllers: [EmployeeController],
})
export class EmployeeModule {}
