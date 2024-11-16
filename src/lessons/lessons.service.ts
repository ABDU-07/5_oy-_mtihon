// lesson.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Lesson } from './lessons.model';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';

@Injectable()
export class LessonService {
  constructor(
    @InjectModel(Lesson)
    private readonly lessonModel: typeof Lesson,
  ) {}

  async findAll() {
    return this.lessonModel.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    const lesson = await this.lessonModel.findByPk(id, {
      include: { all: true },
    });
    if (!lesson) {
      throw new NotFoundException(`Lesson with id ${id} not found`);
    }
    return lesson;
  }

  async create(createLessonDto: CreateLessonDto) {
    return this.lessonModel.create(createLessonDto);
  }

  async update(id: number, updateLessonDto: UpdateLessonDto) {
    const updatedLesson = await this.lessonModel.update(updateLessonDto, {
      where: { id }
    });
    console.log(updatedLesson);
    return updatedLesson;
    
  }

  async delete(id: number) {
    const deleted = await this.lessonModel.destroy({ where: { id } });
    if (!deleted) {
      throw new NotFoundException(`Lesson with id ${id} not found`);
    }
    return { message: `Lesson with id ${id} has been deleted` };
  }
}
