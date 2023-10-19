import { Injectable, NotFoundException } from '@nestjs/common';
import { UserEntity } from '../user/entities/user.entity';
import { LoginDto } from './dto/login.dto';
import { UserService } from '../user/user.service';
import { EncoderService } from 'src/utils/converters/encoder.service';
import { JwtService } from '@nestjs/jwt';
import { ReturnLoginDto } from './dto/return-login.dto';
import { ReturnUserDto } from 'src/user/dto/return-user.dto';
import { LoginPayloadDto } from './dto/login-payload.dto';

@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UserService,
        private readonly encoderService: EncoderService,
        private jwtService: JwtService
    ) { }

    async login(loginDto: LoginDto): Promise<ReturnLoginDto> {
        const user: UserEntity | undefined = await this.userService
            .getUserByEmail(loginDto.email)
            .catch(() => undefined);

        const isMatch = await this.encoderService
            .checkPasswords(
                loginDto.password, 
                user?.password || ''
            );

        if (!user || !isMatch) {
            throw new NotFoundException('Email or password invalid');
        }

        // eslint-disable-next-line prefer-const
        let payload = new LoginPayloadDto(user);

        console.log(">>> payload ", payload)

        return {
            accessToken: this.jwtService.sign({
                ...payload
            }),
            user: new ReturnUserDto(user),
        };
    }
}
