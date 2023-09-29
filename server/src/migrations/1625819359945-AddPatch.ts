import {MigrationInterface, QueryRunner} from "typeorm";

export class AddPatch1625819359945 implements MigrationInterface {
    name = 'AddPatch1625819359945'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "offset_project" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "projectId" character varying NOT NULL, "projectDescription" character varying NOT NULL, "projectImages" character varying NOT NULL, "projectType" character varying NOT NULL, "projectPrice" character varying NOT NULL, "projectLink" character varying NOT NULL, CONSTRAINT "PK_e46f896645364a30469de57b4f6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "offset" ADD "offsetProjectId" character varying`);
        await queryRunner.query(`ALTER TABLE "offset" ADD "offsetPurchaseStatus" character varying NOT NULL DEFAULT 'processing'`);
        await queryRunner.query(`ALTER TABLE "shop" ADD "offsetProjectId" character varying NOT NULL DEFAULT 'pro_prod_8ef8c4473803046247818d35f9f8294b'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shop" DROP COLUMN "offsetProjectId"`);
        await queryRunner.query(`ALTER TABLE "offset" DROP COLUMN "offsetPurchaseStatus"`);
        await queryRunner.query(`ALTER TABLE "offset" DROP COLUMN "offsetProjectId"`);
        await queryRunner.query(`DROP TABLE "offset_project"`);
    }

}
