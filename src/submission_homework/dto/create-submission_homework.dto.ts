// create-submission-homework.dto.ts
import {
  IsInt,
  IsOptional,
  IsString,
  IsBoolean,
  IsNotEmpty,
} from 'class-validator';

export class CreateSubmissionHomeworkDto {
  @IsInt()
  @IsNotEmpty()
  homeworkId: number;

  @IsInt()
  @IsOptional()
  ball?: number;

  @IsString()
  @IsOptional()
  comment?: string;

  @IsBoolean()
  @IsOptional()
  status?: boolean;
}
