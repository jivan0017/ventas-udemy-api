import { Injectable, NotFoundException } from '@nestjs/common';
import { UserEntity } from '../user/entities/user.entity';
import { LoginDto } from './dto/login.dto';
import { UserService } from '../user/user.service';
// import { EncoderService } from '../utils/converters/encoder.service';
import { JwtService } from '@nestjs/jwt';
import { ReturnLoginDto } from './dto/return-login.dto';
import { ReturnUserDto } from '../user/dto/return-user.dto';
import { LoginPayloadDto } from './dto/login-payload.dto';
import { PasswordValidate } from '../utils/converters/password.validate';

@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UserService,
        // private readonly encoderService: EncoderService,
        private jwtService: JwtService
    ) { }

    async login(loginDto: LoginDto): Promise<ReturnLoginDto> {

        const user: UserEntity | undefined = await this.userService
            .getUserByEmail(loginDto.email)
            .catch(() => undefined);

        const isMatch = await PasswordValidate
            .checkPasswords(
                loginDto.password, 
                user?.password || ''
            );

        if (!user || !isMatch) {
            throw new NotFoundException('Email or password invalid');
        }

        const payload = new LoginPayloadDto(user);

        return {
            accessToken: this.jwtService.sign({
                ...payload
            }),
            user: new ReturnUserDto(user),
        };
    }
}
