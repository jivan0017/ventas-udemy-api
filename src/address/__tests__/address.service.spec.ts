import { Test, TestingModule } from '@nestjs/testing';
import { AddressService } from '../address.service';
import { Repository } from 'typeorm';
import { AddressEntity } from '../entities/address.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserService } from '../../user/user.service';
import { userEntityMock } from '../../user/__mocks__/user.mock';
import { CityService } from '../../city/city.service';
import { cityMock } from '../../city/__mocks__/city.mock';
import { createAddressMock } from '../__mocks__/create-address.mock';
import { addressMock } from '../__mocks__/address.mock';

describe('AddressService', () => {

    let service: AddressService;
    let userService: UserService;
    let cityService: CityService;
    let addressRepository: Repository<AddressEntity>;

    beforeEach(async () => {

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AddressService,
                {
                    provide: UserService,
                    useValue: {
                        getUserById: jest.fn().mockResolvedValue(userEntityMock),
                    },
                },
                {
                    provide: CityService,
                    useValue: {
                        getCityById: jest.fn().mockResolvedValue(cityMock),
                    },
                },
                {
                    provide: getRepositoryToken(AddressEntity),
                    useValue: {
                        save: jest.fn().mockResolvedValue(addressMock),
                        find: jest.fn().mockResolvedValue([addressMock]),                        
                        // getCityById: jest.fn().mockResolvedValue(cityMock),
                    },
                },    
                
            ],
        }).compile();

        service = module.get<AddressService>(AddressService);
        userService = module.get<UserService>(UserService);
        cityService = module.get<CityService>(CityService);
        addressRepository = module.get<Repository<AddressEntity>>(
            getRepositoryToken(AddressEntity)
        );
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
        expect(userService).toBeDefined();
        expect(cityService).toBeDefined();
        expect(addressRepository).toBeDefined();
    });

    it('should be Save address', async () => {
        const address = await service.create(
            createAddressMock,
            userEntityMock.id 
        )

        expect(address).toEqual(addressMock);
    });

    it('should be return Address after save - If Exception in userService.getUserById', async () => {
        jest.spyOn(userService, 'getUserById').mockRejectedValueOnce(new Error());

        expect(
            service.create(createAddressMock, userEntityMock.id),
        ).rejects.toThrowError();
    });

    it('should be return Address after save - If Exception in cityService.getCityById', async () => {
        jest.spyOn(cityService, 'getCityById').mockRejectedValueOnce(new Error());

        expect(
            service.create(createAddressMock, userEntityMock.id),
        ).rejects.toThrowError();
    });

    it('should be find all address by user ID and relationship', async () => {
        const addresses = await service.findAddressByUserId(userEntityMock.id);

        expect(addresses).toEqual([addressMock]);
    });

    it('should be return error to find all address by user ID if Exception', async () => {
        jest.spyOn(addressRepository, 'find')
            .mockResolvedValue(undefined);

        expect(
            service.findAddressByUserId(userEntityMock.id)
        ).rejects.toThrowError()
    });    
});
