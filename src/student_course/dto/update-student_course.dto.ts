// update-student-course.dto.ts
import { IsInt, IsOptional } from 'class-validator';

export class UpdateStudentCourseDto {
  @IsInt()
  @IsOptional()
  student_id?: number;

  @IsInt()
  @IsOptional()
  course_id?: number;
}
