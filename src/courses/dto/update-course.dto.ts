// update-course.dto.ts
import { IsString, IsInt, IsDate, IsOptional, IsEnum } from 'class-validator';

export class UpdateCourseDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsInt()
  @IsOptional()
  teacher_id?: number;

  @IsInt()
  @IsOptional()
  category_id?: number;

  @IsInt()
  @IsOptional()
  price?: number;

  @IsDate()
  @IsOptional()
  start_time?: Date;

  @IsDate()
  @IsOptional()
  end_time?: Date;

  @IsInt()
  @IsOptional()
  student_limit?: number;

  @IsOptional()
  @IsEnum([true, false])
  status?: boolean;
}
