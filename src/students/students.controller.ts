// students.controller.ts
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { LoginStudentDto } from './dto/login-students.dto';
import { RoleGuard } from 'src/common/guard/role.guard';
import { Roles } from 'src/common/guard/roles.decorator';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @UseGuards(RoleGuard)
  @Roles('SuperAdmin', 'admin', 'teacher', 'student')
  @Get()
  async findAll() {
    return this.studentsService.findAll();
  }
  @UseGuards(RoleGuard)
  @Roles('SuperAdmin', 'admin', 'teacher', 'student')
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.studentsService.findOne(id);
  }

  @UseGuards(RoleGuard)
  @Roles('SuperAdmin', 'admin')
  @Post()
  async create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentsService.create(createStudentDto);
  }

  @Post('login')
  async login(@Body() login: LoginStudentDto) {
    return this.studentsService.login(login);
  }

  @UseGuards(RoleGuard)
  @Roles('SuperAdmin', 'admin', 'student')
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateStudentDto: UpdateStudentDto,
  ) {
    return this.studentsService.update(id, updateStudentDto);
  }

  @UseGuards(RoleGuard)
  @Roles('SuperAdmin', 'admin')
  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.studentsService.delete(id);
  }
}
