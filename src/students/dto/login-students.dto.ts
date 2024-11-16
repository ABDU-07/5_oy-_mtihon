// create-student.dto.ts
import {
  IsBoolean,
  IsString,
  IsOptional,
  IsNotEmpty,
  IsInt,
} from 'class-validator';

export class LoginStudentDto {
  @IsInt()
  @IsNotEmpty()
  student_id: number;

  @IsString()
  @IsNotEmpty()
  password: string;
}
