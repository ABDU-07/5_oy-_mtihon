// create-student.dto.ts
import { IsBoolean, IsString, IsOptional, IsNotEmpty, IsInt } from 'class-validator';

export class CreateStudentDto {
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @IsString()
  @IsNotEmpty()
  second_name: string;

  @IsInt()
  @IsNotEmpty()
  student_id: number;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsOptional()
  phoneNumber?: string;

  @IsBoolean()
  @IsOptional()
  status?: boolean;
}
