// update-lesson.dto.ts
import { IsArray, IsInt, IsString } from 'class-validator';

export class UpdateLessonDto {
  @IsInt()
  course_id?: number;

  @IsString()
  title?: string;

  @IsString()
  task?: string;

  @IsArray()
  lesson_url?: string[];
}
