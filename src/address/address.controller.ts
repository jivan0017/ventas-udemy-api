import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, UsePipes, ParseIntPipe } from '@nestjs/common';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { UserType } from '../user/enum/user-type.enum';
import { Roles } from '../decorators/roles.decorator';
import { userId } from '../decorators/user-id.decorator';
import { AddressEntity } from './entities/address.entity';
import { ReturnAddressDto } from './dto/return-address.dto';

@Roles(
    UserType.Admin,
    UserType.User,
    UserType.Tipster
)
@Controller('address')
export class AddressController {
    constructor(private readonly addressService: AddressService) { }

    // @Roles(UserType.Admin)
    @Post()
    @UsePipes(ValidationPipe)
    async create(
        @Body() createAddressDto: CreateAddressDto,
        @userId() userId: number,
    ) {
        return this.addressService.create(createAddressDto, userId);
    }

    @Get()
    @UsePipes(ValidationPipe)
    async findAddressByUserId(
        @userId() userId: number,
    ): Promise<ReturnAddressDto[]> {
        return (
            await (this.addressService.findAddressByUserId(userId))
        ).map(
            (address) => new ReturnAddressDto(address)
        );
    }

    // @Get()
    // findAll() {
    //     return this.addressService.findAll();
    // }

    // @Get(':id')
    // findOne(@Param('id') id: string) {
    //     return this.addressService.findOne(+id);
    // }

    // @Patch(':id')
    // update(@Param('id') id: string, @Body() updateAddressDto: UpdateAddressDto) {
    //     return this.addressService.update(+id, updateAddressDto);
    // }

    // @Delete(':id')
    // remove(@Param('id') id: string) {
    //     return this.addressService.remove(+id);
    // }
}
