// employee.controller.ts
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { EmployeeService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { loginEmployeeDto } from './dto/login-employee.dto';
import { Roles } from 'src/common/guard/roles.decorator';
import { RoleGuard } from 'src/common/guard/role.guard';

@Controller('employees')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @UseGuards(RoleGuard)
  @Roles('SuperAdmin', 'admin', 'staff', 'teacher')
  @Get()
  async findAll() {
    return this.employeeService.findAll();
  }
  @UseGuards(RoleGuard)
  @Roles('SuperAdmin', 'admin', 'staff', 'teacher')
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.employeeService.findOne(id);
  }

  @UseGuards(RoleGuard)
  @Roles('SuperAdmin')
  @Post()
  async create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeeService.create(createEmployeeDto);
  }

  @Post('login')
  async login(
    @Body()
    login: loginEmployeeDto | loginEmployeeDto = {
      employeeId: 'SuperAdmin',
      password: 'SuperAdmin',
    },
  ) {
    if (login.employeeId === 'SuperAdmin' && login.password === 'SuperAdmin') {
      const accesToken = await this.employeeService.generateAccesToken(
        login.employeeId,
        login.password,
      );
      const refreshToken = await this.employeeService.generateRefreshToken(
        login.employeeId,
        login.password,
      );
      return { accesToken, refreshToken };
    } else {
      return this.employeeService.login(login);
    }
  }

  @UseGuards(RoleGuard)
  @Roles('SuperAdmin', 'admin', 'staff', 'teacher')
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
  ) {
    return this.employeeService.update(id, updateEmployeeDto);
  }

  @UseGuards(RoleGuard)
  @Roles('SuperAdmin', 'admin')
  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.employeeService.delete(id);
  }
}
