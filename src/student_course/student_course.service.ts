// student_course.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { StudentCourse } from './student_course.model';
import { CreateStudentCourseDto } from './dto/create-student_course.dto';
import { UpdateStudentCourseDto } from './dto/update-student_course.dto';

@Injectable()
export class StudentCourseService {
  constructor(
    @InjectModel(StudentCourse)
    private readonly studentCourseModel: typeof StudentCourse,
  ) {}

  async findAll() {
    return this.studentCourseModel.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    const studentCourse = await this.studentCourseModel.findByPk(id, {
      include: { all: true },
    });
    if (!studentCourse) {
      throw new NotFoundException(`StudentCourse with id ${id} not found`);
    }
    return studentCourse;
  }

  async create(createStudentCourseDto: CreateStudentCourseDto) {
    return this.studentCourseModel.create(createStudentCourseDto);
  }

  async update(id: number, updateStudentCourseDto: UpdateStudentCourseDto) {
    const [affectedRows, [updatedStudentCourse]] =
      await this.studentCourseModel.update(updateStudentCourseDto, {
        where: { id },
        returning: true,
      });
    if (affectedRows === 0) {
      throw new NotFoundException(`StudentCourse with id ${id} not found`);
    }
    return updatedStudentCourse;
  }

  async delete(id: number) {
    const deleted = await this.studentCourseModel.destroy({ where: { id } });
    if (!deleted) {
      throw new NotFoundException(`StudentCourse with id ${id} not found`);
    }
    return { message: `StudentCourse with id ${id} has been deleted` };
  }
}
