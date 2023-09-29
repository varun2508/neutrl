import {MigrationInterface, QueryRunner} from "typeorm";

export class AddShopBooleans1624605783223 implements MigrationInterface {
    name = 'AddShopBooleans1624605783223'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shop" ADD "neutrlCoversOffset" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "shop" ADD "previewMode" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "offset" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "offset" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "offset" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "offset" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "order" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "order" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "order" ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "order" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "offset" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "offset" ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "offset" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "offset" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "shop" DROP COLUMN "previewMode"`);
        await queryRunner.query(`ALTER TABLE "shop" DROP COLUMN "neutrlCoversOffset"`);
    }

}
