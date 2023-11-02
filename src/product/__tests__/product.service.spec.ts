import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from '../product.service';
import { Repository } from 'typeorm';
import { ProductEntity } from '../entities/product.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { productMock } from '../__mocks__/product.mock';

describe('ProductService', () => {
    let service: ProductService;
    let productRepository: Repository<ProductEntity>

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ProductService,
                {
                    provide: getRepositoryToken(ProductEntity),
                    useValue: {
                        find: jest.fn().mockResolvedValue([productMock]),
                        save: jest.fn().mockResolvedValue(productMock)
                    }
                }
            ],
        }).compile();

        service = module.get<ProductService>(ProductService);
        productRepository = module.get<Repository<ProductEntity>>(
            getRepositoryToken(ProductEntity),
        );
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
        expect(productRepository).toBeDefined();
    });

    it('should be return all products', async () => {
        const products = await service.findAll();

        expect(products).toEqual([productMock]);
    });

    it('should be return error if var products empty', async () => {
        jest.spyOn(productRepository, 'find').mockResolvedValue([])

        expect(service.findAll()).rejects.toThrowError();
    });
    
    it('should be return error in Exception', async () => {
        jest.spyOn(productRepository, 'find').mockRejectedValue(new Error());

        expect(service.findAll()).rejects.toThrowError();
    });       
});
