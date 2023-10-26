import { ReturnUserDto } from "../../user/dto/return-user.dto";

export interface ReturnLoginInterface {
    user: ReturnUserDto;
    accessToken: string;    
}
