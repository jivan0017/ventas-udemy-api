import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { EncoderService } from '../utils/converters/encoder.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [
        UserModule,
        JwtModule.registerAsync({
            useFactory: () => ({
                secret: process.env.JWT_SECRET,
                signOptions: {
                    expiresIn: '7d'//process.env.JWT_EXPIRES_IN
                }                
            })
        })
    ],
    providers: [AuthService, EncoderService], 
    controllers: [AuthController]
})
export class AuthModule { }
