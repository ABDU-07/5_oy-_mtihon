// submission-homework.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Put,
} from '@nestjs/common';
import { SubmissionHomeworkService } from './submission_homework.service';
import { CreateSubmissionHomeworkDto } from './dto/create-submission_homework.dto';
import { UpdateSubmissionHomeworkDto } from './dto/update-submission_homework.dto';
import { RoleGuard } from 'src/common/guard/role.guard';
import { Roles } from 'src/common/guard/roles.decorator';

@Controller('submission-homework')
export class SubmissionHomeworkController {
  constructor(
    private readonly submissionHomeworkService: SubmissionHomeworkService,
  ) {}

  @UseGuards(RoleGuard)
  @Roles('SuperAdmin', 'admin', 'teacher')
  @Post()
  create(@Body() dto: CreateSubmissionHomeworkDto) {
    return this.submissionHomeworkService.create(dto);
  }

  @UseGuards(RoleGuard)
  @Roles('SuperAdmin', 'admin', 'teacher', 'student')
  @Get()
  findAll() {
    return this.submissionHomeworkService.findAll();
  }

  @UseGuards(RoleGuard)
  @Roles('SuperAdmin', 'admin', 'teacher', 'student')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.submissionHomeworkService.findOne(+id);
  }

  @UseGuards(RoleGuard)
  @Roles('SuperAdmin', 'admin', 'teacher')
  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateSubmissionHomeworkDto) {
    return this.submissionHomeworkService.update(+id, dto);
  }

  @UseGuards(RoleGuard)
  @Roles('SuperAdmin', 'admin', 'teacher')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.submissionHomeworkService.remove(+id);
  }
}
