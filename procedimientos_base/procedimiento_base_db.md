# DOCKERIZANDO

- Se crea en la raíz misma que contiene el proyecto NEST, la carpeta /db, dentro de esta, el fichero: init.sql en cuyo contenido:

-- CREATE DATABASE IF NOT EXISTS codrrdb
SELECT 'CREATE DATABASE ventasdb'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'ventasdb')\gexec

- Ejecutar docker desktop

- Crear el fichero en la raíz misma del proyecto NEST, el fichero: docker-compose.yml

version: '3.1'

services:
  ventas_pg:
    image: postgres:15.1
    container_name: ventas_pg
    restart: always
    environment:
      POSTGRES_DB: ventasdb    
      POSTGRES_USER: ventasadmin
      POSTGRES_PASSWORD: secret1234
    volumes:
      - ./db/init.sql:/docker-entrypoint-initdb.d/init.sql
    ports:
      - 5432:5432


- Ejecutar el comando para subir la imagen:
docker-compose up

- Ejecutar el comando para bajar la imagen:
docker-compose stop


-------------------------------------------------------------------------

# MIGRACIONES
- crear manualmente migración a partir del comando:
npx typeorm migration:create ./src/migration/create_table_user
npx typeorm migration:create ./src/migration/create_table_state
npx typeorm migration:create ./src/migration/create_table_city
npx typeorm migration:create ./src/migration/create_table_address

## ventas
npx typeorm migration:create ./src/migration/create_table_category
npx typeorm migration:create ./src/migration/create_table_product

- Alter tables:
npx typeorm migration:create ./src/migration/alter-table-state
npx typeorm migration:create ./src/migration/insert-in-state
npx typeorm migration:create ./src/migration/insert-in-city
npx typeorm migration:create ./src/migration/alter-table-city

- inser user root
npx typeorm migration:create ./src/migration/insert-root-in-user

- Agregar columna
npx typeorm migration:create ./src/migration/alter-table-user
