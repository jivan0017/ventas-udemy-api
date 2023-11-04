import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { CategoryService } from '../category/category.service';

@Injectable()
export class ProductService {

    constructor(
        @InjectRepository(ProductEntity)
        private readonly productRepository: Repository<ProductEntity>,
        private readonly categoryService: CategoryService,
    ) {}

    async findAll(): Promise<ProductEntity[]> {

        const products = await this.productRepository.find();

        if (!products || products.length === 0) {
            throw new NotFoundException(`Not found products`);
        }

        return products;
    }

    async create(createProductDto: CreateProductDto): Promise<ProductEntity> {
        const category = await this.categoryService.findCategoryById(
            createProductDto.categoryId
        );

        if (!category || category == undefined) {
            throw new BadRequestException(`Can not create product without Category valid`);
        }

        return this.productRepository.save({
            ...createProductDto
        });
    }
}
