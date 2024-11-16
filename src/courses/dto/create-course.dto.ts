// create-course.dto.ts
import { IsString, IsInt, IsDate, IsOptional, IsEnum } from 'class-validator';

export class CreateCourseDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsInt()
  teacher_id: number;

  @IsInt()
  category_id: number;

  @IsInt()
  price: number;

  @IsDate()
  start_time: Date;

  @IsDate()
  end_time: Date;

  @IsInt()
  student_limit: number;

  @IsOptional()
  @IsEnum([true, false])
  status?: boolean;
}
