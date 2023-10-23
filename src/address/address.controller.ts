import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, UsePipes, ParseIntPipe } from '@nestjs/common';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { UserType } from '../user/enum/user-type.enum';
import { Roles } from '../decorators/roles.decorator';
import { userId } from '../decorators/user-id.decorator';

// @Roles(UserType.Admin)
@Controller('address')
export class AddressController {
    constructor(private readonly addressService: AddressService) { }

    @Roles(UserType.Admin)
    @Post()
    @UsePipes(ValidationPipe)
    async create(
        @Body() createAddressDto: CreateAddressDto,
        @userId() userId: number,
    ) {
        return this.addressService.create(createAddressDto, userId);
    }

    @Get()
    findAll() {
        return this.addressService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.addressService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateAddressDto: UpdateAddressDto) {
        return this.addressService.update(+id, updateAddressDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.addressService.remove(+id);
    }
}
