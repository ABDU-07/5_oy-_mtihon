// create-attendance.dto.ts
import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateAttendanceDto {
  @IsInt()
  @IsNotEmpty()
  lessonId: number;

  @IsInt()
  @IsNotEmpty()
  studentId: number;
}
