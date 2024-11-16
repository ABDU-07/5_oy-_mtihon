// homework.controller.ts
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
  Req,
} from '@nestjs/common';
import { HomeworkService } from './homework.service';
import { CreateHomeworkDto } from './dto/create-homework.dto';
import { UpdateHomeworkDto } from './dto/update-homework.dto';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { FilesInterceptor } from '@nestjs/platform-express';
import * as fs from 'fs';
import { RoleGuard } from 'src/common/guard/role.guard';
import { Roles } from 'src/common/guard/roles.decorator';

const storage = diskStorage({
  destination: './uploads/homework_uploads',
  filename: (req, file, callback) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 10000);
    const ext = extname(file.originalname);
    callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
  },
});

@Controller('homework')
export class HomeworkController {
  constructor(private readonly homeworkService: HomeworkService) {}

  @UseGuards(RoleGuard)
  @Roles('SuperAdmin', 'admin', 'teacher', 'student')
  @Get()
  async findAll() {
    return this.homeworkService.findAll();
  }

  @UseGuards(RoleGuard)
  @Roles('SuperAdmin', 'admin', 'teacher', 'student')
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.homeworkService.findOne(id);
  }

  @UseGuards(RoleGuard)
  @Roles('SuperAdmin', 'student')
  @Post()
  @UseInterceptors(
    FilesInterceptor('homeworkUrl', 10, {
      storage,
    }),
  )
  async create(
    @UploadedFiles() video: Express.Multer.File[],
    @Body() createHomeworkDto: CreateHomeworkDto,
    @Req() req,
  ) {
    if (video) {
      createHomeworkDto.homeworkUrl = video.map((item) => item.filename);
    }
    createHomeworkDto.studentId = req.user.id;
    return this.homeworkService.create(createHomeworkDto);
  }

  @UseGuards(RoleGuard)
  @Roles('SuperAdmin', 'student')
  @Put('add_url/:id')
  @UseInterceptors(
    FilesInterceptor('homeworkUrl', 10, {
      storage,
    }),
  )
  async update(
    @Param('id') id: number,
    @UploadedFiles() video: Express.Multer.File[],
    @Body() updateHomeworkDto: UpdateHomeworkDto,
    @Req() req,
  ) {
    if (video) {
      const homeworkUrl = (await this.homeworkService.findOne(id)).homeworkUrl;
      homeworkUrl.push(...video.map((item) => item.filename));
      updateHomeworkDto.homeworkUrl = homeworkUrl;
    }
    updateHomeworkDto.studentId = req.user.id;
    return this.homeworkService.update(id, updateHomeworkDto);
  }

  @UseGuards(RoleGuard)
  @Roles('SuperAdmin', 'admin')
  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.homeworkService.delete(id);
  }

  @UseGuards(RoleGuard)
  @Roles('SuperAdmin', 'student')
  @Delete('url/:homework_id/:url_id')
  async deleteUrl(
    @Param('homework_id') homework_id: string,
    @Param('url_id') url_id: string,
  ) {
    const homeworkUrl = (await this.homeworkService.findOne(+homework_id))
      .homeworkUrl;

    const homework = homeworkUrl.filter(
      (item) => item !== homeworkUrl[+url_id],
    );
    const filePath = './uploads/homework_uploads/' + homeworkUrl[+url_id];

    fs.unlink(filePath, (err) => {
      if (err) {
        console.error('Error deleting the file:', err);
      } else {
        console.log('File deleted successfully:', filePath);
      }
    });
    return this.homeworkService.update(+homework_id, { homeworkUrl: homework });
  }
}
