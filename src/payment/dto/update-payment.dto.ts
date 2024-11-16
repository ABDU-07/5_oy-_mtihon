// update-payment.dto.ts
import { IsInt, IsOptional, IsBoolean, IsDate } from 'class-validator';

export class UpdatePaymentDto {
  @IsInt()
  @IsOptional()
  student_id?: number;

  @IsInt()
  @IsOptional()
  course_id?: number;

  @IsInt()
  @IsOptional()
  amount?: number;

  @IsDate()
  @IsOptional()
  payment_date?: Date;

  @IsBoolean()
  @IsOptional()
  status?: boolean;
}
