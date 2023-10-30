import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ReturnCategoryDto } from './dto/return-category.dto';
import { CategoryService } from './category.service';
import { Roles } from '../decorators/roles.decorator';
import { UserType } from '../user/enum/user-type.enum';
import { CategoryEntity } from './entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';

@Roles(UserType.Admin, UserType.User)
@Controller('category')
export class CategoryController {

    constructor(
        private readonly categoryService: CategoryService
    ) {}

    @Get()
    async findAllCategories(): Promise<ReturnCategoryDto[]> {
        return (
            await (this.categoryService.findAllCategories())
        ).map(
            (category) => new ReturnCategoryDto(category)
        );
    }

    @Roles(UserType.Admin)
    @UsePipes(ValidationPipe) 
    @Post()
    async create(
        @Body() createCategoryDto: CreateCategoryDto
    ): Promise<CategoryEntity> {
        return this.categoryService.create(createCategoryDto);
    }
}
