import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../user.controller';
import { UserService } from '../user.service';
import { ReturnUserDto } from '../dto/return-user.dto';
import { createUserMock } from '../__mocks__/create-user.mock';

describe('UserController', () => {
    let controller: UserController;
    let userService: UserService;

    const returnUserDtoMock: ReturnUserDto = {
        name: "user test ",
        email: "test@test.com",
        phone: "3205545454",
        cpf: "cpf test",
        typeUser: 1,
        addresses: undefined,
    }    

    const UserServiceMock = {
        create: jest.fn().mockReturnValue(createUserMock),
        findAll: jest.fn().mockReturnValue([returnUserDtoMock]),
        getUserByIdUsingRelationship: jest.fn().mockReturnValue(returnUserDtoMock),
        // getUserByEmail: jest.fn(), 
        // getUserByIdUsingRelationship: jest.fn(),
    }

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UserController],
            providers: [
                {
                    provide: UserService,
                    useValue: UserServiceMock
                },
            ],
        }).compile();

        userService = module.get<UserService>(UserService);
        controller = module.get<UserController>(UserController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('findAll and create User', () => {
        it('should be findAll users', async () => {
            const result = await controller.findAll()

            expect(userService.findAll).toHaveBeenCalled();
            expect(result).toEqual([returnUserDtoMock])
        });

        it('should be create a User', async () => {
            const result = await controller.create(createUserMock)

            expect(userService.create).toHaveBeenCalled();
            expect(result).toEqual(createUserMock)
        });
    });

    describe('find by ID', () => {
        it('should be get User By ID', async () => {
            const result = await controller.getUserById(1)

            expect(userService.getUserByIdUsingRelationship).toHaveBeenCalled();
            expect(result).toEqual(returnUserDtoMock);
        });             
    });
});
