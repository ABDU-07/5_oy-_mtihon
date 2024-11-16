// payment.controller.ts
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
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { RoleGuard } from 'src/common/guard/role.guard';
import { Roles } from 'src/common/guard/roles.decorator';

@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @UseGuards(RoleGuard)
  @Roles('SuperAdmin', 'admin', 'teacher', 'student')
  @Get()
  async findAll() {
    return this.paymentService.findAll();
  }

  @UseGuards(RoleGuard)
  @Roles('SuperAdmin', 'admin', 'teacher', 'student')
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.paymentService.findOne(id);
  }

  @UseGuards(RoleGuard)
  @Roles('SuperAdmin', 'admin')
  @Post()
  async create(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentService.create(createPaymentDto);
  }
  @UseGuards(RoleGuard)
  @Roles('SuperAdmin', 'admin')
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updatePaymentDto: UpdatePaymentDto,
  ) {
    return this.paymentService.update(id, updatePaymentDto);
  }

  @UseGuards(RoleGuard)
  @Roles('SuperAdmin', 'admin')
  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.paymentService.delete(id);
  }
}
