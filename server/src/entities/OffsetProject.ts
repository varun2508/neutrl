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
export class OffsetProject extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Field()
    @CreateDateColumn()
    createdAt: string;

    @Field()
    @UpdateDateColumn()
    updatedAt: string;

    @Field()
    @Column()
    projectId!: string;

    @Field()
    @Column()
    projectDescription: string;

    @Field()
    @Column()
    projectImages: string;

    @Field()
    @Column()
    projectType: string;

    @Field()
    @Column()
    projectPrice: string;

    @Field({ nullable: true })
    @Column()
    projectLink: string;
}
