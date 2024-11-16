// homework.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Homework } from './homework.model';
import { CreateHomeworkDto } from './dto/create-homework.dto';
import { UpdateHomeworkDto } from './dto/update-homework.dto';

@Injectable()
export class HomeworkService {
  constructor(
    @InjectModel(Homework)
    private readonly homeworkModel: typeof Homework,
  ) {}

  async findAll() {
    return this.homeworkModel.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    const homework = await this.homeworkModel.findByPk(id, {
      include: { all: true },
    });
    if (!homework) {
      throw new NotFoundException(`Homework with id ${id} not found`);
    }
    return homework;
  }

  async create(createHomeworkDto: CreateHomeworkDto) {
    return this.homeworkModel.create(createHomeworkDto);
  }

  async update(id: number, updateHomeworkDto: UpdateHomeworkDto) {
    const [affectedRows, [updatedHomework]] = await this.homeworkModel.update(
      updateHomeworkDto,
      {
        where: { id },
        returning: true,
      },
    );
    if (affectedRows === 0) {
      throw new NotFoundException(`Homework with id ${id} not found`);
    }
    return updatedHomework;
  }

  async delete(id: number) {
    const deleted = await this.homeworkModel.destroy({ where: { id } });
    if (!deleted) {
      throw new NotFoundException(`Homework with id ${id} not found`);
    }
    return { message: `Homework with id ${id} has been deleted` };
  }
}
