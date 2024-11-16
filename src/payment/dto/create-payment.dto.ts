// create-payment.dto.ts
import { IsInt, IsNotEmpty, IsBoolean, IsDate } from 'class-validator';

export class CreatePaymentDto {
  @IsInt()
  @IsNotEmpty()
  student_id: number;

  @IsInt()
  @IsNotEmpty()
  course_id: number;

  @IsInt()
  @IsNotEmpty()
  amount: number;

  @IsDate()
  @IsNotEmpty()
  payment_date: Date;

  @IsBoolean()
  status: boolean;
}
