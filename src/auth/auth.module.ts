import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { EncoderService } from '../utils/converters/encoder.service';

@Module({
    imports: [UserModule],
    providers: [AuthService, EncoderService], 
    controllers: [AuthController]
})
export class AuthModule { }
