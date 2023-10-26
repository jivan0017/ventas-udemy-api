import { Injectable } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { AddressEntity } from './entities/address.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from '../user/user.service';
import { CityService } from '../city/city.service';

@Injectable()
export class AddressService {

    constructor(
        @InjectRepository(AddressEntity)
        private readonly addressRepository: Repository<AddressEntity>,
        private readonly userService: UserService,
        private readonly cityService: CityService
    ) { }

    async create(createAddressDto: CreateAddressDto, userId: number): Promise<AddressEntity> {

        await this.userService.getUserById(userId);
        await this.cityService.getCityById(createAddressDto.cityId);

        return this.addressRepository.save({
            ...createAddressDto,
            userId
        });
    }

    findAll() {
        return `This action returns all address`;
    }

    findOne(id: number) {
        return `This action returns a #${id} address`;
    }

    update(id: number, updateAddressDto: UpdateAddressDto) {
        return `This action updates a #${id} address`;
    }

    remove(id: number) {
        return `This action removes a #${id} address`;
    }
}
