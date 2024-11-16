// submission-homework.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { SubmissionHomework } from './submission_homework.model';
import { CreateSubmissionHomeworkDto } from './dto/create-submission_homework.dto';
import { UpdateSubmissionHomeworkDto } from './dto/update-submission_homework.dto';

@Injectable()
export class SubmissionHomeworkService {
  constructor(
    @InjectModel(SubmissionHomework)
    private submissionHomeworkModel: typeof SubmissionHomework,
  ) {}

  async create(dto: CreateSubmissionHomeworkDto) {
    dto.status = dto.ball >= 60 ? true : false;
    return this.submissionHomeworkModel.create(dto);
  }

  async findAll(): Promise<SubmissionHomework[]> {
    return this.submissionHomeworkModel.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    return this.submissionHomeworkModel.findByPk(id, {
      include: { all: true },
    });
  }

  async update(id: number, dto: UpdateSubmissionHomeworkDto) {
    return this.submissionHomeworkModel.update(dto, { where: { id } });
  }

  async remove(id: number) {
    return this.submissionHomeworkModel.destroy({ where: { id } });
  }
}
