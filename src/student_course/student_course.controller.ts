// student_course.controller.ts
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
import { StudentCourseService } from './student_course.service';
import { CreateStudentCourseDto } from './dto/create-student_course.dto';
import { UpdateStudentCourseDto } from './dto/update-student_course.dto';
import { RoleGuard } from 'src/common/guard/role.guard';
import { Roles } from 'src/common/guard/roles.decorator';

@Controller('student-course')
export class StudentCourseController {
  constructor(private readonly studentCourseService: StudentCourseService) {}

  @UseGuards(RoleGuard)
  @Roles('SuperAdmin', 'admin', 'teacher', 'student')
  @Get()
  async findAll() {
    return this.studentCourseService.findAll();
  }

  @UseGuards(RoleGuard)
  @Roles('SuperAdmin', 'admin', 'teacher', 'student')
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.studentCourseService.findOne(id);
  }

  @UseGuards(RoleGuard)
  @Roles('SuperAdmin', 'admin')
  @Post()
  async create(@Body() createStudentCourseDto: CreateStudentCourseDto) {
    return this.studentCourseService.create(createStudentCourseDto);
  }

  @UseGuards(RoleGuard)
  @Roles('SuperAdmin', 'admin')
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateStudentCourseDto: UpdateStudentCourseDto,
  ) {
    return this.studentCourseService.update(id, updateStudentCourseDto);
  }

  @UseGuards(RoleGuard)
  @Roles('SuperAdmin', 'admin')
  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.studentCourseService.delete(id);
  }
}
