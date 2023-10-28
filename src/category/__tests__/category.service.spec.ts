import { Test, TestingModule } from '@nestjs/testing';
import { CategoryService } from '../category.service';
import { Repository } from 'typeorm';
import { CategoryEntity } from '../entities/category.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { categoryMock } from '../__mocks__/category.mock';

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
});
