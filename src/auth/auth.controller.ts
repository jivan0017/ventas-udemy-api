import { 
    Body, 
    Controller, 
    Post, 
    UsePipes, 
    ValidationPipe 
} from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { ReturnUserDto } from '../user/dto/return-user.dto';
import { AuthService } from './auth.service';
import { ReturnLoginDto } from './dto/return-login.dto';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService
    ) {}

    @UsePipes(ValidationPipe)
    @Post()
    async login(@Body() loginDto: LoginDto): Promise<ReturnLoginDto> {
        return await this.authService.login(loginDto);
    }
}
