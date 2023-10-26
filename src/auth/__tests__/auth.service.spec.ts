import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth.service';
import { UserService } from '../../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { userEntityMock } from '../../user/__mocks__/user.mock';
import { jwtMock } from '../__mocks__/jwt.mock';
import { loginUserMock } from '../__mocks__/login-user.mock';
import { ReturnUserDto } from '../../user/dto/return-user.dto';

describe('AuthService', () => {

    let service: AuthService;
    let userService: UserService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuthService,
                {
                    provide: UserService,
                    useValue: {
                        getUserByEmail: jest.fn().mockResolvedValue(userEntityMock),
                    }
                },
                {
                    provide: JwtService,
                    useValue: {
                        sign: () => jwtMock,
                    }
                },
            ],
        }).compile();

        service = module.get<AuthService>(AuthService);
        userService = module.get<UserService>(UserService);
        // encoderService = module.get<EncoderService>(EncoderService);

    });

    it('should be defined', () => {
        expect(service).toBeDefined();
        expect(userService).toBeDefined();
    });

    it('should be return user if password and email is valid', async () => {
        const user = await service.login(loginUserMock);

        expect(user).toEqual({
            accessToken: jwtMock,
            user: new ReturnUserDto(userEntityMock),
        })
    });

    it('should return user if password invalid and email valid', async () => {
        expect(
            service.login({ ...loginUserMock, password: '1234' }),
        ).rejects.toThrowError();
    });

    it('should return user if Email not exits', async () => {
        jest.spyOn(userService, 'getUserByEmail').mockResolvedValue(undefined);

        expect(service.login(loginUserMock)).rejects.toThrowError();
    });

    it('should return error in UserService', async () => {
        jest.spyOn(userService, 'getUserByEmail').mockRejectedValue(new Error());

        expect(service.login(loginUserMock)).rejects.toThrowError();
    });

});
