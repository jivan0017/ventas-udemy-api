import { ReturnAddressDto } from "../../address/dto/return-address.dto";
import { UserEntity } from "../entities/user.entity";

export class ReturnUserDto {
    // id: number;
    name: string;
    email: string;
    phone: string;
    cpf: string;
    typeUser: number;
    addresses?: ReturnAddressDto[];

    constructor(userEntity: UserEntity) {
        // this.id = userEntity.id; 
        this.name = userEntity.name;
        this.email = userEntity.email;
        this.phone = userEntity.phone;
        this.cpf = userEntity.cpf;
        this.typeUser = userEntity.typeUser;

        this.addresses = userEntity.addresses 
            ? userEntity.addresses.map((address) => new ReturnAddressDto(address))
            : undefined;
    }
}
