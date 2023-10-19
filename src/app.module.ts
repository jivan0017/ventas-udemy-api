import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSourceConfig } from './config/datasources/data.source';
import { StateModule } from './state/state.module';
import { CityModule } from './city/city.module';
import { AddressModule } from './address/address.module';
import { CacheModule } from './cache/cache.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot({
      envFilePath: `.${process.env.PROJECT_ENVIROMENT}.env`,
      isGlobal: true,
    }),

    // INFO: Database
    TypeOrmModule.forRoot(
        DataSourceConfig,
    ),

    StateModule,

    CityModule,

    AddressModule,

    CacheModule,

    AuthModule,    
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
