import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateOffsets1626130339537 implements MigrationInterface {
    name = 'UpdateOffsets1626130339537'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shop" ALTER COLUMN "offsetProjectId" SET DEFAULT ''`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shop" ALTER COLUMN "offsetProjectId" SET DEFAULT 'pro_prod_8ef8c4473803046247818d35f9f8294b'`);
    }

}
