import { ConfigModule, ConfigService } from "@nestjs/config";
import { EnviromentConfig } from "../../constants/enviroment.config";
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
    entities: [`${__dirname}${EnviromentConfig.ENTITIES_DIRNAME_THREE_LEVELS}`],
    migrations: [EnviromentConfig.MIGRATIONS_DIRNAME_ABSOLUTE_PATH],
    migrationsTableName: EnviromentConfig.MIGRATIONS_TABLE_NAME,
    migrationsRun: EnviromentConfig.MIGRATIONS_RUN_FALSE,
    synchronize: EnviromentConfig.SINCRONIZED_DATABASE_TRUE,
}

export const AppDS = new DataSource(DataSourceConfig)
