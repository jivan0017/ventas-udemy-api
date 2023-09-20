# CREAR PROYECTO NEST
- comando:
nest new api-blog -g

# GENERAL CONFIG
- Instalar module config
npm i --save @nestjs/config

- class validador
npm install @nestjs/class-validator --save

# CREAR RECURSO
- para saber las ayudas previo a la ejecición del comando:
 nest generate resource business/post --help

- ejecutar la creación del recurso en una carpeta predefinida
 nest generate resource business/post --no-spec

# TYPE ORM INSTALL
- Recurso web:
https://docs.nestjs.com/techniques/database

- comando:
npm install --save @nestjs/typeorm typeorm mysql2

# Crear proyecto en directorio - carpeta actual
- Crear proyecto nest en el directorio actual:
nest new .


# Crear interface dentro de carpeta
- comando:
nest g interface user/interfaces/user

# Instalar packages:

- config
npm i --save @nestjs/config

# Crear carpeta raíz constantes:
config
    constants
        cors

# instalar package:
npm i --save cross-env        

