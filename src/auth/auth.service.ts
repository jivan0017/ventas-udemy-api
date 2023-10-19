import { Injectable, NotFoundException } from '@nestjs/common';
import { UserEntity } from '../user/entities/user.entity';
import { LoginDto } from './dto/login.dto';
import { UserService } from '../user/user.service';
import { EncoderService } from 'src/utils/converters/encoder.service';


@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UserService,
        private readonly encoderService: EncoderService
    ) { }

    async login(loginDto: LoginDto): Promise<UserEntity> {
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

        return user;
    }
}
