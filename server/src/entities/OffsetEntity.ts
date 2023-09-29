import { TOffsetStatus } from "src/types";
import { Authorized, Field, ObjectType } from "type-graphql";
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";

@ObjectType()
@Entity()
export class Offset extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Field()
    @Column()
    shop: string;

    @Field()
    @Column("decimal")
    value: number;

    @Field()
    @Column("decimal")
    weight: number;

    @Field()
    @Column()
    orderId: string;

    @Field()
    @CreateDateColumn()
    createdAt: string;

    @Field()
    @UpdateDateColumn()
    updatedAt: string;

    @Field({ nullable: true })
    @Column({
        nullable: true,
    })
    offsetProjectId?: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    offsetAllocations: string;

    @Authorized("SHOP")
    @Field()
    @Column({ default: "processing" })
    offsetPurchaseStatus: TOffsetStatus;
}
