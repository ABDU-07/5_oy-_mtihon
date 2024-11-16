// create-homework.dto.ts
import { IsArray, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateHomeworkDto {
  @IsInt()
  @IsNotEmpty()
  lessonId: number;

  @IsInt()
  @IsNotEmpty()
  studentId: number;

  @IsString()
  text?: string;

  @IsArray()
  homeworkUrl?: string[];
}
