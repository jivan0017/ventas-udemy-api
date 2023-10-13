import { MigrationInterface, QueryRunner } from "typeorm"

export class CreateTableUser1696982499289 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
            CREATE TABLE public.user (
                id integer NOT NULL,
                name character varying NOT NULL,
                email  character varying NOT NULL,
                cpf  character varying NOT NULL,
                type_user int NOT NULL,
                phone  character varying NOT NULL,
                status boolean DEFAULT true,
                password  character varying NOT NULL,
                created_at timestamp without time zone DEFAULT now() NOT NULL,
                updated_at timestamp without time zone DEFAULT now() NOT NULL,
                primary key (id)
            );
            
            CREATE SEQUENCE public.user_id_seq
                AS integer
                START WITH 1
                INCREMENT BY 1
                NO MINVALUE
                NO MAXVALUE
                CACHE 1;
                
            ALTER SEQUENCE public.user_id_seq OWNED BY public.user.id;
            
            ALTER TABLE ONLY public.user ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);        
        `);

        /*

        - pregunte a MAYER
        - MAYER > MARIA CAROLINA
        
        -------------------------------------
        - revisé los apuntes con Dahiana

        CONFIGURÉ EL ENTORNO DE DESARROLLO PARA LA API:
            CORRER EN EL PUERTO 8080 WSL
            - instalación de variables de entorno
        
        */
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
            drop table public.user;        
        `);        
    }

}
