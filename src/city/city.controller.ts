import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { CityService } from './city.service';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { CityEntity } from './entities/city.entity';

@Controller('city')
export class CityController {
    constructor(private readonly cityService: CityService) { }

    @Post()
    create(@Body() createCityDto: CreateCityDto) {
        return this.cityService.create(createCityDto);
    }

    @Get('/:stateId')
    async getAllCitiesByStateId(
        @Param('stateId', ParseIntPipe) stateId: number
    ): Promise<CityEntity[]> {
        return this.cityService.getAllCitiesByStateId(stateId)
    }

    @Get()
    findAll() {
        return this.cityService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.cityService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateCityDto: UpdateCityDto) {
        return this.cityService.update(+id, updateCityDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.cityService.remove(+id);
    }
}
