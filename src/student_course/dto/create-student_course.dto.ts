// create-student-course.dto.ts
import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateStudentCourseDto {
  @IsInt()
  @IsNotEmpty()
  student_id: number;

  @IsInt()
  @IsNotEmpty()
  course_id: number;
}
