// update-attendance.dto.ts
import { IsInt, IsOptional } from 'class-validator';

export class UpdateAttendanceDto {
  @IsOptional()
  @IsInt()
  lessonId?: number;

  @IsOptional()
  @IsInt()
  studentId?: number;
}
