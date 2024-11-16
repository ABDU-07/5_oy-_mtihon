// employee.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Employee } from './employees.model';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '../common/config/config.service';
import { loginEmployeeDto } from './dto/login-employee.dto';
@Injectable()
export class EmployeeService {
  constructor(
    @InjectModel(Employee)
    private readonly employeeModel: typeof Employee,
    private readonly configService: ConfigService,
  ) {}

  async findAll() {
    return this.employeeModel.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    const employee = await this.employeeModel.findByPk(id, {
      include: { all: true },
    });
    if (!employee) {
      throw new NotFoundException(`Employee with id ${id} not found`);
    }
    return employee;
  }

  async create(createEmployeeDto: CreateEmployeeDto) {
    createEmployeeDto.employeeId = Math.floor(10000 + Math.random() * 90000);
    createEmployeeDto.password = createEmployeeDto.phoneNumber;
    createEmployeeDto.password = await bcrypt.hash(
      createEmployeeDto.password,
      10,
    );
    return this.employeeModel.create(createEmployeeDto);
  }

  async update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    const [affectedRows, [updatedEmployee]] = await this.employeeModel.update(
      updateEmployeeDto,
      {
        where: { id },
        returning: true,
      },
    );
    if (affectedRows === 0) {
      throw new NotFoundException(`Employee with id ${id} not found`);
    }
    return updatedEmployee;
  }

  async delete(id: number) {
    const deleted = await this.employeeModel.destroy({ where: { id } });
    if (!deleted) {
      throw new NotFoundException(`Employee with id ${id} not found`);
    }
    return { message: `Employee with id ${id} has been deleted` };
  }

  async login(login: loginEmployeeDto) {
    const result = await this.findUserByLogin(login.employeeId);

    if (!result) {
      return 'Login yoki Parol xato';
    }
    const checkPassword = await bcrypt.compare(login.password, result.password);
    if (!checkPassword) {
      return 'Login yoki Parol xato';
    }

    const accesToken = await this.generateAccesToken(
      result.employeeId,
      result.role,
    );

    const refreshToken = await this.generateRefreshToken(
      result.employeeId,
      result.role,
    );
    return { accesToken, refreshToken };
  }

  async findUserByLogin(data) {
    const result = await this.employeeModel.findOne({
      where: { employeeId: data },
    });
    return result;
  }

  async generateAccesToken(data, role) {
    const accessSecret = this.configService.get('JWT_ACCCES_SECRET');

    return jwt.sign({ data, role }, accessSecret, {
      expiresIn: '1d',
    });
  }

  async generateRefreshToken(data, role) {
    const refreshSecret = this.configService.get('JWT_REFRESH_SECRET');
    return jwt.sign({ data, role }, refreshSecret, {
      expiresIn: '8d',
    });
  }
}
