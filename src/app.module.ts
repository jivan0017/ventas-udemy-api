import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSourceConfig } from './config/constants/datasources/data.source';

@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot({
      envFilePath: `.${process.env.PROJECT_ENVIROMENT}.env`,
      isGlobal: true,
    }),

    // INFO: Database
    TypeOrmModule.forRoot(
        DataSourceConfig
    ),    
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
