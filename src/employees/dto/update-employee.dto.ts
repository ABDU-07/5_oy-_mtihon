// update-employee.dto.ts
import { IsEnum, IsOptional, IsString, IsPhoneNumber, IsInt } from 'class-validator';

export class UpdateEmployeeDto {
  @IsString()
  @IsOptional()
  first_name?: string;

  @IsString()
  @IsOptional()
  second_name?: string;

  @IsInt()
  @IsOptional()
  employeeId?: number;

  @IsString()
  @IsOptional()
  password?: string;

  @IsEnum(['teacher', 'admin', 'staff'])
  @IsOptional()
  role?: 'teacher' | 'admin' | 'staff';

  @IsPhoneNumber()
  @IsOptional()
  phoneNumber?: string;

  @IsOptional()
  status?: boolean;
}
