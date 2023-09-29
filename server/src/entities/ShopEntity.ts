import { Authorized, Field, ObjectType } from "type-graphql";
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";

@ObjectType()
@Entity()
export class Shop extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Field({ nullable: true })
    @Column({ unique: false })
    shop!: string;

    @Authorized("ADMIN")
    @Field({ nullable: true })
    @Column()
    scope!: string;

    @Field({ nullable: true })
    @Column({ unique: false, nullable: true })
    email: string;

    @Authorized("SHOP")
    @Field({ nullable: true })
    @Column({ nullable: true })
    shopType: string;

    @Authorized("ADMIN")
    @Field({ nullable: true })
    @Column({ unique: false })
    shopKey!: string;

    @Authorized("SHOP")
    @Field(() => String, { nullable: true })
    @CreateDateColumn()
    createdAt: Date;

    @Authorized("SHOP")
    @Field(() => String, { nullable: true })
    @UpdateDateColumn()
    updatedAt: Date;

    @Authorized("SHOP")
    @Field({ nullable: true })
    @Column({ nullable: true })
    companyName: string;

    @Authorized("SHOP")
    @Field({ nullable: true })
    @Column({ nullable: true })
    managerName: string;

    @Authorized("SHOP")
    @Field({ nullable: true })
    @Column({ nullable: true })
    companySize: string;

    @Authorized("SHOP")
    @Field({ nullable: true })
    @Column({ nullable: true })
    productCategory: string;

    @Authorized("SHOP")
    @Field({ nullable: true })
    @Column({ nullable: true })
    averageProductWeight: string;
    // TODO Change to float/number?

    @Field({ nullable: true })
    @Column("boolean", { default: false })
    merchantPaysOffset: boolean;

    @Field({ nullable: true })
    @Column("boolean", { default: true })
    calculateOffset: boolean;

    @Field({ nullable: true })
    @Column({ nullable: true })
    flatRateOffsetAmount: string;

    @Authorized("SHOP")
    @Field({ nullable: true })
    @Column("boolean", { default: false })
    completedOnboarding: boolean;

    @Field({ nullable: true })
    @Column("boolean", { default: false })
    appEnabledOnStorefront: boolean;

    @Authorized("ADMIN")
    @Field({ nullable: true })
    @Column("boolean", { default: false })
    neutrlCoversOffset: boolean;

    @Field({ nullable: true })
    @Column("boolean", { default: false })
    previewMode: boolean;

    // TODO OneToMany relationsihp for order IDs

    // TODO OneTomany relationship for product IDs
    // @OneToMany(() => Product, (product) => product.shop)
    // products: Product[];
    @Field({ nullable: true })
    @Column({ nullable: true })
    shopifyProductId: string;

    @Authorized("SHOP")
    @Field({ nullable: true })
    @Column({ nullable: true })
    billingId: string;

    @Authorized("SHOP")
    @Field({ nullable: true })
    @Column("boolean", { default: false })
    billingActive: boolean;

    @Authorized("SHOP")
    @Field({ nullable: true })
    @Column("boolean", { default: false })
    completedInstallation: boolean;

    @Field()
    @Column({ default: "" })
    offsetProjectId: string;

    @Authorized("ADMIN")
    @Field({ nullable: true })
    @Column({ nullable: true })
    featureFlags: string;
}
