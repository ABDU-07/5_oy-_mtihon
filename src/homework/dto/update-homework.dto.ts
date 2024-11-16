// update-homework.dto.ts
import { IsArray, IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateHomeworkDto {
  @IsInt()
  @IsOptional()
  lessonId?: number;

  @IsInt()
  @IsOptional()
  studentId?: number;

  @IsString()
  text?: string;

  @IsArray()
  homeworkUrl?: string[];
}
