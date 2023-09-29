import { Field, ObjectType } from "type-graphql";
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
export class Order extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Field()
    @Column()
    shop: string;

    @Field()
    @Column()
    orderInfo: string;

    @Field()
    @CreateDateColumn()
    createdAt: string;

    @Field()
    @UpdateDateColumn()
    updatedAt: string;
}
