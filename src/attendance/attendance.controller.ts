// attendance.controller.ts
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
import { AttendanceService } from './attendance.service';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';
import { RoleGuard } from 'src/common/guard/role.guard';
import { Roles } from 'src/common/guard/roles.decorator';

@Controller('attendance')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @UseGuards(RoleGuard)
  @Roles('SuperAdmin', 'admin', 'teacher', 'student')
  @Get()
  async findAll() {
    return this.attendanceService.findAll();
  }

  @UseGuards(RoleGuard)
  @Roles('SuperAdmin', 'admin', 'teacher', 'student')
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.attendanceService.findOne(id);
  }

  @UseGuards(RoleGuard)
  @Roles('SuperAdmin', 'admin', 'teacher')
  @Post()
  async create(@Body() createAttendanceDto: CreateAttendanceDto) {
    return this.attendanceService.create(createAttendanceDto);
  }

  @UseGuards(RoleGuard)
  @Roles('SuperAdmin', 'admin', 'teacher')
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateAttendanceDto: UpdateAttendanceDto,
  ) {
    return this.attendanceService.update(id, updateAttendanceDto);
  }

  @UseGuards(RoleGuard)
  @Roles('SuperAdmin', 'admin', 'teacher')
  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.attendanceService.delete(id);
  }
}
