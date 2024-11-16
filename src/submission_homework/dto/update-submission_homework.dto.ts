// update-submission-homework.dto.ts
import { IsInt, IsOptional, IsString, IsBoolean } from 'class-validator';

export class UpdateSubmissionHomeworkDto {
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
