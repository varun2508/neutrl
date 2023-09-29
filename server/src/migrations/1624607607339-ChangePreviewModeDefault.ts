import {MigrationInterface, QueryRunner} from "typeorm";

export class ChangePreviewModeDefault1624607607339 implements MigrationInterface {
    name = 'ChangePreviewModeDefault1624607607339'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shop" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "shop" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "shop" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "shop" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "shop" ALTER COLUMN "previewMode" SET DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shop" ALTER COLUMN "previewMode" SET DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "shop" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "shop" ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "shop" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "shop" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
    }

}
