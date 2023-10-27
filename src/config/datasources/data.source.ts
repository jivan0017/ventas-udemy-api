import { ConfigModule, ConfigService } from "@nestjs/config";
import { EnviromentConfig } from "../constants/enviroment.config";
import { DataSource, DataSourceOptions } from "typeorm";


ConfigModule.forRoot({
    envFilePath: `.${process.env.PROJECT_ENVIROMENT}.env`,
    isGlobal: true
});

// INFO: preparando el mecanismo con cargue dinámico de variables de entorno
const configService = new ConfigService();

export const DataSourceConfig: DataSourceOptions = {
    type: EnviromentConfig.DATABASE_MOTOR_POSTGRES,
    host: configService.get('DB_HOST'),
    port: parseInt(configService.get('DB_PORT')),
    username: configService.get('DB_USER'),
    password: configService.get('DB_PASSWORD'),
    database: configService.get('DB_NAME'),
    // entities: [`${__dirname}${EnviromentConfig.ENTITIES_DIRNAME_THREE_LEVELS}`],
    // entities: [`${__dirname}/**/*.entity{.js,.ts}`],
    entities: [`dist/**/*.entity{.js,.ts}`],
    migrationsTableName: EnviromentConfig.MIGRATIONS_TABLE_NAME,
    // migrations: [`${__dirname}/migration/{.ts,*.js}`],
    //migrations: [`src/migration/**/*{.ts,.js}`], //<-- ok para migraciones manuales
    migrations: [`dist/migration/**/*{.ts,.js}`], //<-- ok para migraciones manuales
    // migrations: [`${__dirname}/migration/{.ts,*.js}`],
    migrationsRun: EnviromentConfig.MIGRATIONS_RUN_FALSE,
    synchronize: EnviromentConfig.SINCRONIZED_DATABASE_FALSE,
} 

export const AppDS = new DataSource(DataSourceConfig)
