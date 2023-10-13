import { MigrationInterface, QueryRunner } from "typeorm"

export class InsertInState1697218392084 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
            INSERT INTO state ("id", "name", "uf")
            VALUES
                (5,'ANTIOQUIA', 'uf'),
                (8,'ATLÁNTICO', 'uf'),
                (11,'BOGOTÁ, D.C.', 'uf'),
                (13,'BOLÍVAR', 'uf'),
                (15,'BOYACÁ', 'uf'),
                (17,'CALDAS', 'uf'),
                (18,'CAQUETÁ', 'uf'),
                (19,'CAUCA', 'uf'),
                (20,'CESAR', 'uf'),
                (23,'CÓRDOBA', 'uf'),
                (25,'CUNDINAMARCA', 'uf'),
                (27,'CHOCÓ', 'uf'),
                (41,'HUILA', 'uf'),
                (44,'LA GUAJIRA', 'uf'),
                (47,'MAGDALENA', 'uf'),
                (50,'META', 'uf'),
                (52,'NARIÑO', 'uf'),
                (54,'NORTE DE SANTANDER', 'uf'),
                (63,'QUINDIO', 'uf'),
                (66,'RISARALDA', 'uf'),
                (68,'SANTANDER', 'uf'),
                (70,'SUCRE', 'uf'),
                (73,'TOLIMA', 'uf'),
                (76,'VALLE DEL CAUCA', 'uf'),
                (81,'ARAUCA', 'uf'),
                (85,'CASANARE', 'uf'),
                (86,'PUTUMAYO', 'uf'),
                (88,'ARCHIPIÉLAGO DE SAN ANDRÉS, PROVIDENCIA Y SANTA CATALINA', 'uf'),
                (91,'AMAZONAS', 'uf'),
                (94,'GUAINÍA', 'uf'),
                (95,'GUAVIARE', 'uf'),
                (97,'VAUPÉS', 'uf'),
                (99,'VICHADA', 'uf');
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
            DELETE FROM public.state;
        `);     
    }

}
