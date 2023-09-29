import {MigrationInterface, QueryRunner} from "typeorm";

export class AddNewFields1619576508697 implements MigrationInterface {
    name = 'AddNewFields1619576508697'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shop" ADD "billingActive" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "shop" ADD "completedInstallation" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shop" DROP COLUMN "completedInstallation"`);
        await queryRunner.query(`ALTER TABLE "shop" DROP COLUMN "billingActive"`);
    }

}
