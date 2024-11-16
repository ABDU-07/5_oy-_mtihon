// payment.module.ts
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { Payment } from './payment.model';
import { Student } from '../students/students.model';
import { Course } from '../courses/courses.model';

@Module({
  imports: [SequelizeModule.forFeature([Payment, Student, Course])],
  providers: [PaymentService],
  controllers: [PaymentController],
})
export class PaymentModule {}
