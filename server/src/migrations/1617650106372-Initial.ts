import {MigrationInterface, QueryRunner} from "typeorm";

export class Initial1617650106372 implements MigrationInterface {
    name = 'Initial1617650106372'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "offset" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "shop" character varying NOT NULL, "value" numeric NOT NULL, "weight" numeric NOT NULL, "orderId" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_77c7be70e8dde6a52064449cd13" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "order" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "shop" character varying NOT NULL, "orderInfo" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "shop" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "shop" character varying NOT NULL, "scope" character varying NOT NULL, "email" character varying, "shopType" character varying, "shopKey" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "companyName" character varying, "managerName" character varying, "companySize" character varying, "productCategory" character varying, "averageProductWeight" character varying, "merchantPaysOffset" boolean NOT NULL DEFAULT false, "calculateOffset" boolean NOT NULL DEFAULT true, "flatRateOffsetAmount" character varying, "completedOnboarding" boolean NOT NULL DEFAULT false, "appEnabledOnStorefront" boolean NOT NULL DEFAULT false, "shopifyProductId" character varying, "billingId" character varying, CONSTRAINT "PK_ad47b7c6121fe31cb4b05438e44" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "shop"`);
        await queryRunner.query(`DROP TABLE "order"`);
        await queryRunner.query(`DROP TABLE "offset"`);
    }

}
