import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseInterceptors,
  UploadedFiles,
  UseGuards,
} from '@nestjs/common';
import { LessonService } from './lessons.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { diskStorage } from 'multer';
import path, { extname } from 'path';
import { FilesInterceptor } from '@nestjs/platform-express';
import * as fs from 'fs';
import { RoleGuard } from 'src/common/guard/role.guard';
import { Roles } from 'src/common/guard/roles.decorator';

const storage = diskStorage({
  destination: './uploads/lessons_uploads',
  filename: (req, file, callback) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 10000);
    const ext = extname(file.originalname);
    callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
  },
});

@Controller('lessons')
export class LessonController {
  constructor(private readonly lessonService: LessonService) {}

  @UseGuards(RoleGuard)
  @Roles('SuperAdmin', 'admin', 'teacher', 'student')
  @Get()
  async findAll() {
    return this.lessonService.findAll();
  }

  @UseGuards(RoleGuard)
  @Roles('SuperAdmin', 'admin', 'teacher', 'student')
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.lessonService.findOne(id);
  }

  @UseGuards(RoleGuard)
  @Roles('SuperAdmin', 'teacher')
  @Post()
  @UseInterceptors(
    FilesInterceptor('lesson_url', 10, {
      storage,
    }),
  )
  async create(
    @UploadedFiles() video: Express.Multer.File[],
    @Body() CreateLessonDto: CreateLessonDto,
  ) {
    if (video) {
      CreateLessonDto.lesson_url = video.map((item) => item.filename);
    }

    return this.lessonService.create(CreateLessonDto);
  }

  @UseGuards(RoleGuard)
  @Roles('SuperAdmin', 'teacher')
  @Put('add_url/:id')
  @UseInterceptors(
    FilesInterceptor('videoUrls', 5, {
      storage,
    }),
  )
  async update(
    @Param('id') id: number,
    @UploadedFiles() video: Express.Multer.File[],
    @Body() updateLessonDto: UpdateLessonDto,
  ) {
    if (video) {
      const lesson_url = (await this.lessonService.findOne(id)).lesson_url;
      lesson_url.push(...video.map((item) => item.filename));
      updateLessonDto.lesson_url = lesson_url;
    }

    return this.lessonService.update(id, updateLessonDto);
  }

  @UseGuards(RoleGuard)
  @Roles('SuperAdmin', 'admin')
  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.lessonService.delete(id);
  }

  @UseGuards(RoleGuard)
  @Roles('SuperAdmin', 'teacher')
  @Delete('url/:lesson_id/:url_id')
  async deleteUrl(
    @Param('lesson_id') lesson_id: string,
    @Param('url_id') url_id: string,
  ) {
    const lesson_url = (await this.lessonService.findOne(+lesson_id))
      .lesson_url;

    const lesson = lesson_url.filter((item) => item !== lesson_url[+url_id]);
    const filePath = './src/lessons/lessons_uploads/' + lesson_url[+url_id];

    fs.unlink(filePath, (err) => {
      if (err) {
        console.error('Error deleting the file:', err);
      } else {
        console.log('File deleted successfully:', filePath);
      }
    });
    return this.lessonService.update(+lesson_id, { lesson_url: lesson });
  }
}
