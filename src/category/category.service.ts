// category.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Category } from './category.model';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category)
    private readonly categoryModel: typeof Category,
  ) {}

  async findAll() {
    return this.categoryModel.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    const category = await this.categoryModel.findByPk(id, {
      include: { all: true },
    });
    if (!category) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }
    return category;
  }

  async create(createCategoryDto: CreateCategoryDto) {
    return this.categoryModel.create(createCategoryDto);
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const [affectedRows, [updatedCategory]] = await this.categoryModel.update(
      updateCategoryDto,
      {
        where: { id },
        returning: true,
      },
    );
    if (affectedRows === 0) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }
    return updatedCategory;
  }

  async delete(id: number) {
    const deleted = await this.categoryModel.destroy({ where: { id } });
    if (!deleted) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }
    return { message: `Category with id ${id} has been deleted` };
  }
}
