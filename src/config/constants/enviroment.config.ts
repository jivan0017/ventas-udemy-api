
export class EnviromentConfig {

  // GENERAL
  static readonly PROJECT_ENVIROMENT= process.env.PROJECT_ENVIROMENT;
  static readonly HASH_SALT= +process.env.HASH_SALT;

  static readonly ENTITIES_DIRNAME = `/../../**/*.entity{.ts,.js}`;
  static readonly ENTITIES_DIRNAME_THREE_LEVELS = `/../../../**/*.entity{.ts,.js}`;
  static readonly ENTITIES_DIRNAME_DIST = `dist/**/*.entity{.ts,.js}`;

  static readonly MIGRATIONS_DIRNAME = `/migration/*{.ts,*.js}`;
  static readonly MIGRATIONS_DIRNAME_ABSOLUTE_PATH = `/migration/{.ts,*.js}`;
  static readonly MIGRATIONS_DIRNAME_ABSOLUTE_PATH_V2 = `/src/migration/{.ts,*.js}`;
  static readonly MIGRATIONS_DIRNAME_DIST = `dist/db/migration/*{.ts,.js}`;

  static readonly MIGRATIONS_TABLE_NAME = 'migrations'; 

  // DATABASE
  static readonly DATABASE_MOTOR_MYSQL = "mysql";
  static readonly DATABASE_MOTOR_POSTGRES = "postgres";
  static readonly SINCRONIZED_DATABASE_FALSE = false;
  static readonly SINCRONIZED_DATABASE_TRUE = true;
  static readonly MIGRATIONS_RUN_FALSE = false;
  static readonly MIGRATIONS_RUN_TRUE = true;  
}
