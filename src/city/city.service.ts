import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { CityEntity } from './entities/city.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CacheService } from '../cache/cache.service';

// import { CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class CityService {

    constructor(
        @InjectRepository(CityEntity)
        private readonly cityRepository: Repository<CityEntity>,
        private readonly cacheService: CacheService
    ) { }

    create(createCityDto: CreateCityDto) {
        return 'This action adds a new city';
    }

    findAll() {
        return `This action returns all city`;
    }

    async getAllCitiesByStateId(stateId: number): Promise<CityEntity[]> {

        return this.cacheService.getCache<CityEntity[]>(
            `state_${stateId}`,
            () => this.cityRepository.find({
                where: {
                    stateId,
                }
            })
        )
        // const citiesCache: CityEntity[] = await this.cacheManager.get(`${stateId}`);

        // if (citiesCache) {
        //     return citiesCache
        // }

        // const cities = await this.cityRepository.find({
        //     where: {
        //         stateId,
        //     }
        // });

        // await this.cacheManager.set(`state_${stateId}`, cities);

        // return cities;
    }

    async getCityById(cityId: number): Promise<CityEntity> {
        const city = await this.cityRepository.findOne({
            where: {
                id: cityId
            }
        });

        if (!city) {
            throw new NotFoundException(`cityId ${cityId} Not Found`);
        }

        return city;
    }    

    findOne(id: number) {
        return `This action returns a #${id} city`;
    }

    update(id: number, updateCityDto: UpdateCityDto) {
        return `This action updates a #${id} city`;
    }

    remove(id: number) {
        return `This action removes a #${id} city`;
    }
}
