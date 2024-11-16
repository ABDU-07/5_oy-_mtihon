// attendance.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Attendance } from './attendance.model';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectModel(Attendance)
    private readonly attendanceModel: typeof Attendance,
  ) {}

  async findAll() {
    return this.attendanceModel.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    return  this.attendanceModel.findByPk(id, {
      include: { all: true },
    });
  }

  async create(createAttendanceDto: CreateAttendanceDto) {
    return this.attendanceModel.create(createAttendanceDto);
  }

  async update(id: number, updateAttendanceDto: UpdateAttendanceDto) {
    const [affectedRows, [updatedAttendance]] =
      await this.attendanceModel.update(updateAttendanceDto, {
        where: { id },
        returning: true,
      });
    if (affectedRows === 0) {
      throw new NotFoundException(`Attendance with id ${id} not found`);
    }
    return updatedAttendance;
  }

  async delete(id: number) {
    const deleted = await this.attendanceModel.destroy({ where: { id } });
    if (!deleted) {
      throw new NotFoundException(`Attendance with id ${id} not found`);
    }
    return { message: `Attendance with id ${id} has been deleted` };
  }
}
