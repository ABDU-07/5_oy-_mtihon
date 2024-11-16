// students.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Student } from './students.model';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { LoginStudentDto } from './dto/login-students.dto';
import { ConfigService } from '../common/config/config.service';

@Injectable()
export class StudentsService {
  constructor(
    @InjectModel(Student)
    private readonly studentModel: typeof Student,
    private readonly configService: ConfigService,
  ) {}

  async findAll() {
    return this.studentModel.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    const student = await this.studentModel.findByPk(id, {
      include: { all: true },
    });
    if (!student) {
      throw new NotFoundException(`Student with id ${id} not found`);
    }
    return student;
  }

  async create(createStudentDto: CreateStudentDto) {
    createStudentDto.student_id = Math.floor(10000 + Math.random() * 90000);
    createStudentDto.password = createStudentDto.phoneNumber;
    createStudentDto.password = await bcrypt.hash(
      createStudentDto.password,
      10,
    );
    return this.studentModel.create(createStudentDto);
  }

  async update(id: number, updateStudentDto: UpdateStudentDto) {
    const [affectedRows, [updatedStudent]] = await this.studentModel.update(
      updateStudentDto,
      {
        where: { id },
        returning: true,
      },
    );
    if (affectedRows === 0) {
      throw new NotFoundException(`Student with id ${id} not found`);
    }
    return updatedStudent;
  }

  async delete(id: number) {
    return this.studentModel.destroy({ where: { id } });
  }
  async login(login: LoginStudentDto) {
    const result = await this.findUserByLogin(login.student_id);

    if (!result) {
      return 'Login yoki Parol xato';
    }
    const checkPassword = await bcrypt.compare(login.password, result.password);
    if (!checkPassword) {
      return 'Login yoki Parol xato';
    }

    const accesToken = await this.generateAccesToken(result.student_id);

    const refreshToken = await this.generateRefreshToken(result.student_id);
    return { accesToken, refreshToken };
  }

  async findUserByLogin(data) {
    const result = await this.studentModel.findOne({
      where: { student_id: data },
    });
    return result;
  }

  async generateAccesToken(data) {
    const accessSecret = this.configService.get('JWT_ACCCES_SECRET');

    return jwt.sign({ data, role: 'student' }, accessSecret, {
      expiresIn: '1d',
    });
  }

  async generateRefreshToken(data) {
    const refreshSecret = this.configService.get('JWT_REFRESH_SECRET');
    return jwt.sign({ data, role: 'student' }, refreshSecret, {
      expiresIn: '8d',
    });
  }
}
