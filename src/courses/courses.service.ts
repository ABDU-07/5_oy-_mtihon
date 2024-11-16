// course.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Course } from './courses.model';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Injectable()
export class CourseService {
  constructor(
    @InjectModel(Course)
    private readonly courseModel: typeof Course,
  ) {}

  async findAll() {
    return this.courseModel.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    const course = await this.courseModel.findByPk(id, {
      include: { all: true },
    });
    if (!course) {
      throw new NotFoundException(`Course with id ${id} not found`);
    }
    return course;
  }

  async create(createCourseDto: CreateCourseDto) {
    return this.courseModel.create(createCourseDto);
  }

  async update(id: number, updateCourseDto: UpdateCourseDto) {
    const [affectedRows, [updatedCourse]] = await this.courseModel.update(
      updateCourseDto,
      {
        where: { id },
        returning: true,
      },
    );
    if (affectedRows === 0) {
      throw new NotFoundException(`Course with id ${id} not found`);
    }
    return updatedCourse;
  }

  async delete(id: number) {
    const deleted = await this.courseModel.destroy({ where: { id } });
    if (!deleted) {
      throw new NotFoundException(`Course with id ${id} not found`);
    }
    return { message: `Course with id ${id} has been deleted` };
  }
}
