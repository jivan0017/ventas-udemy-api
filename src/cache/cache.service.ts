import { Inject, Injectable } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class CacheService {
    constructor(
        @Inject(CACHE_MANAGER) private cacheManager: Cache
    ) { }

    async getCache<T>(
        key: string, 
        functionRequest: () => Promise<T>
    ): Promise<T> {
        const allDataCache: T = await this.cacheManager.get(key);

        if (allDataCache) {
            return allDataCache
        }

        const allData: T = await functionRequest();

        await this.cacheManager.set(key, allData);

        return allData;
    }
}
