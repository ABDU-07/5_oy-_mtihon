// create-employee.dto.ts
import {
  IsEnum,
  IsNotEmpty,
  IsString,
  IsOptional,
  IsPhoneNumber,
  IsInt,
} from 'class-validator';

export class CreateEmployeeDto {
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @IsString()
  @IsNotEmpty()
  second_name: string;

  @IsInt()
  @IsNotEmpty()
  employeeId: number;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsEnum(['teacher', 'admin', 'staff'])
  @IsNotEmpty()
  role: 'teacher' | 'admin' | 'staff';

  @IsPhoneNumber()
  @IsOptional()
  phoneNumber?: string;

  @IsOptional()
  status?: boolean;
}
