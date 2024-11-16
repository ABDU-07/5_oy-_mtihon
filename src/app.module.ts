  import { Module } from '@nestjs/common';
  import { SequelizeModule } from '@nestjs/sequelize';
  import { ConfigModule } from '@nestjs/config';
  import { EmployeeModule } from './employees/employees.module';
  import { CourseModule } from './courses/courses.module';
  import { AttendanceModule } from './attendance/attendance.module';
  import { CategoryModule } from './category/category.module';
  import { LessonModule } from './lessons/lessons.module';
  import { StudentsModule } from './students/students.module';
  import { PaymentModule } from './payment/payment.module';
  import { StudentCourseModule } from './student_course/student_course.module';
  import { SharingModule } from './common/sharing.module';
  import { SubmissionHomeworkModule } from './submission_homework/submission_homework.module';
  import { HomeworkModule } from './homework/homework.module';
  import { ServeStaticModule } from '@nestjs/serve-static';
  import { join } from 'path';

  @Module({
    imports: [
      ConfigModule.forRoot({ isGlobal: true }),
      SequelizeModule.forRoot({
        dialect: 'postgres',
        host: process.env.DB_HOST,
        port: +process.env.DB_PORT,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        autoLoadModels: true,
        synchronize: true,
      }),
      ServeStaticModule.forRoot({
        rootPath: join(__dirname, '../', 'uploads/lessons_uploads'),
        serveRoot: '/static/lessons_uploads',
      }),
      ServeStaticModule.forRoot({
        rootPath: join(__dirname, '../', 'uploads/homework_uploads'),
        serveRoot: '/static/homework_uploads',
      }),
      SharingModule,
      HomeworkModule,
      EmployeeModule,
      CourseModule,
      AttendanceModule,
      CategoryModule,
      LessonModule,
      StudentsModule,
      PaymentModule,
      StudentCourseModule,
      SubmissionHomeworkModule,
    ],
  })
  export class AppModule {}
