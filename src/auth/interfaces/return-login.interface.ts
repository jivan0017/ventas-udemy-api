import { ReturnUserDto } from "src/user/dto/return-user.dto";

export interface ReturnLoginInterface {
    user: ReturnUserDto;
    accessToken: string;    
}
