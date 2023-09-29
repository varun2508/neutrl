import {MigrationInterface, QueryRunner} from "typeorm";

export class AddShopFeatureFlagsColumn1626127316778 implements MigrationInterface {
    name = 'AddShopFeatureFlagsColumn1626127316778'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "offset" ADD "offsetAllocations" character varying`);
        await queryRunner.query(`ALTER TABLE "shop" ADD "featureFlags" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shop" DROP COLUMN "featureFlags"`);
        await queryRunner.query(`ALTER TABLE "offset" DROP COLUMN "offsetAllocations"`);
    }

}
