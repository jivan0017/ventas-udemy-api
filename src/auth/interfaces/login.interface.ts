import { ReturnUserDto } from "src/user/dto/return-user.dto";

export interface LoginInterface {
    user: ReturnUserDto;
    accessToken: string;    
}
