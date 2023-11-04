import { Test, TestingModule } from '@nestjs/testing';
import { CategoryService } from '../category.service';
import { Repository } from 'typeorm';
import { CategoryEntity } from '../entities/category.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { categoryMock } from '../__mocks__/category.mock';
import { createCategoryMock } from '../__mocks__/create-category.mock';

describe('CategoryService', () => {
    let service: CategoryService;
    let categoryRepository: Repository<CategoryEntity>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CategoryService,
                {
                    provide: getRepositoryToken(CategoryEntity),
                    useValue: {
                        find: jest.fn().mockResolvedValue([categoryMock]),
                        findOne: jest.fn().mockResolvedValue(categoryMock),
                        save: jest.fn().mockResolvedValue(categoryMock),
                    }
                }
            ],
        }).compile();

        service = module.get<CategoryService>(CategoryService);
        categoryRepository = module.get<Repository<CategoryEntity>>(
            getRepositoryToken(CategoryEntity)
        );
        
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should be list category []', async () => {
        const categories = await service.findAllCategories();

        expect(categories).toEqual([categoryMock]);
    });

    it('should be error to list category [] is empty', async () => {
        jest.spyOn(categoryRepository, 'find').mockResolvedValue([]);

        expect(service.findAllCategories()).rejects.toThrowError();
    });

    it('should be error to list category [] is Exception', async () => {
        jest.spyOn(categoryRepository, 'find').mockRejectedValue(new Error());

        expect(service.findAllCategories()).rejects.toThrowError();
    });

    it('should be return category after save', async () => {
        jest.spyOn(categoryRepository, 'findOne').mockResolvedValue(undefined);

        const category = await service.create(createCategoryMock);

        expect(category).toEqual(categoryMock);
    });   

    it('should be return Error after to try save if exists category name', async () => {
        expect(service.create(createCategoryMock)).rejects.toThrowError();
    });    

    it('should be return Error after to try save', async () => {
        jest.spyOn(categoryRepository, 'save').mockRejectedValue(new Error())
        expect(service.create(createCategoryMock)).rejects.toThrowError();
    });

    it('should be get/findOne a Category By name', async () => {
        const category = await service.findCategoryByName(categoryMock.name);

        expect(category).toEqual(categoryMock);
    });

    it('should be error to get/findOne a Category By name', async () => {
        jest.spyOn(categoryRepository, 'findOne').mockResolvedValue(undefined);

        expect(
            service.findCategoryByName(categoryMock.name)
        ).rejects.toThrowError();
    });

    it('should be find category by ID: findOne', async () => {
        const category = await service.findCategoryById(categoryMock.id);

        expect(category).toEqual(categoryMock);
    });    

    it('should be error to get/findOne a Category By ID', async () => {
        jest.spyOn(categoryRepository, 'findOne').mockResolvedValue(undefined);

        expect(
            service.findCategoryById(categoryMock.id)
        ).rejects.toThrowError();
    });
});
