import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CategoryEntity } from './entities/category.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoryService {
 
    constructor(
        @InjectRepository(CategoryEntity)
        private readonly categoryRepository: Repository<CategoryEntity>,
    ) { }    

    async findAllCategories(): Promise<CategoryEntity[]> {
        const categories = await this.categoryRepository.find();

        if (!categories ||  categories.length === 0) {
            throw new NotFoundException('Categories is empty');
        }

        return categories;
    }

    async findCategoryByName(name: string): Promise<CategoryEntity> {
        const category = await this.categoryRepository.findOne({
            where: {
                name,
            }
        })

        if (!category) {
            throw new NotFoundException(`Category with name: ${name} not exists`);
        }

        return category;
    }

    async create(createCategoryDto: CreateCategoryDto): Promise<CategoryEntity> {
        const category = await this.findCategoryByName(createCategoryDto.name)
                            .catch(() => undefined);

        if (category) {
            throw new BadRequestException(`Category with name: ${createCategoryDto.name} exists`);
        }

        return this.categoryRepository.save(createCategoryDto);
    }
}
