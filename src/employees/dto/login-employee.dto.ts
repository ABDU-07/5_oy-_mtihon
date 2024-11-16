import { IsNotEmpty, IsString, IsInt } from 'class-validator';

export class loginEmployeeDto {
  @IsInt()
  @IsNotEmpty()
  employeeId: number | string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
