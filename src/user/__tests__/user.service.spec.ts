import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user.service';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { userEntityMock } from '../__mocks__/user.mock';
import { createUserMock } from '../__mocks__/create-user.mock';

describe('UserService', () => {
    let service: UserService;

    let userRepository: Repository<UserEntity>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UserService,
                {
                    provide: getRepositoryToken(UserEntity),
                    useValue: {
                        findOne: jest.fn().mockResolvedValue(userEntityMock),
                        save: jest.fn().mockResolvedValue(userEntityMock),
                    },
                },
            ],
        }).compile();

        service = module.get<UserService>(UserService);
        userRepository = module.get<Repository<UserEntity>>(
            getRepositoryToken(UserEntity)
        );
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
        expect(userRepository).toBeDefined();
    });

    it('should be return user in getUserByEmail (Error DB)', async () => {
        jest.spyOn(userRepository, 'findOne').mockRejectedValueOnce(
            new Error()
        )

        expect(
            service.getUserByEmail(userEntityMock.email)
        ).rejects.toThrowError()
    });

    it('should be return error in getUserByEmail', async () => {
        jest.spyOn(userRepository, 'findOne').mockResolvedValue(undefined);

        expect(service.getUserByEmail(userEntityMock.email)).rejects.toThrowError();
    });

    it('should be return user in getUserById', async () => {
        const user = await service.getUserById(userEntityMock.id);

        expect(user).toEqual(userEntityMock);
    });

    it('should be return user in getUserById (Error DB)', async () => {
        jest.spyOn(userRepository, 'findOne').mockRejectedValueOnce(
            new Error()
        );

        expect(
            service.getUserById(userEntityMock.id)
        ).rejects.toThrowError()
    });

    it('should be return error in getUserById', async () => {
        jest.spyOn(userRepository, 'findOne').mockResolvedValue(undefined);

        expect(service.getUserById(userEntityMock.id)).rejects.toThrowError();
    });

    it('should be return user in getUserByIdUsingRelationship', async () => {
        const user = await service.getUserByIdUsingRelationship(userEntityMock.id);

        expect(user).toEqual(userEntityMock);
    });

    it('should be return error if user exists', async () => {
        expect(service.create(createUserMock)).rejects.toThrowError();
    });

    it('should be return error if user NOT exists', async () => {
        jest.spyOn(userRepository, 'findOne').mockResolvedValue(undefined);

        const user = await service.create(createUserMock);

        expect(user).toEqual(userEntityMock);
        expect(service.create(createUserMock)).rejects.toThrowError();
    });    
});
