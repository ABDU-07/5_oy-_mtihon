// update-student.dto.ts
import { IsBoolean, IsString, IsOptional, IsInt } from 'class-validator';

export class UpdateStudentDto {
  @IsString()
  @IsOptional()
  first_name?: string;

  @IsString()
  @IsOptional()
  second_name?: string;

  @IsInt()
  @IsOptional()
  student_id?: number;

  @IsString()
  @IsOptional()
  password?: string;

  @IsString()
  @IsOptional()
  phoneNumber?: string;

  @IsBoolean()
  @IsOptional()
  status?: boolean;
}
