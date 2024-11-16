// create-lesson.dto.ts
import {
  IsInt,
  IsNotEmpty,
  IsString,
  IsOptional,
  IsArray,
} from 'class-validator';

export class CreateLessonDto {
  @IsInt()
  @IsNotEmpty()
  course_id: number;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  task?: string;

  @IsArray()
  lesson_url?: string[];
}
