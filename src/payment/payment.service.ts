// payment.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Payment } from './payment.model';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';

@Injectable()
export class PaymentService {
  constructor(
    @InjectModel(Payment)
    private readonly paymentModel: typeof Payment,
  ) {}

  async findAll() {
    return this.paymentModel.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    const payment = await this.paymentModel.findByPk(id, {
      include: { all: true },
    });
    if (!payment) {
      throw new NotFoundException(`Payment with id ${id} not found`);
    }
    return payment;
  }

  async create(createPaymentDto: CreatePaymentDto) {
    return this.paymentModel.create(createPaymentDto);
  }

  async update(id: number, updatePaymentDto: UpdatePaymentDto) {
    const [affectedRows, [updatedPayment]] = await this.paymentModel.update(
      updatePaymentDto,
      {
        where: { id },
        returning: true,
      },
    );
    if (affectedRows === 0) {
      throw new NotFoundException(`Payment with id ${id} not found`);
    }
    return updatedPayment;
  }

  async delete(id: number) {
    const deleted = await this.paymentModel.destroy({ where: { id } });
    if (!deleted) {
      throw new NotFoundException(`Payment with id ${id} not found`);
    }
    return { message: `Payment with id ${id} has been deleted` };
  }
}
