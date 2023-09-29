import { Field, InputType } from "type-graphql";

@InputType()
export class CreateShopInput {
  @Field()
  shop: string;

  @Field()
  shopKey: string;

  @Field()
  scope: string;

  @Field()
  billingId: string;
}

@InputType()
export class GetShopInput {
  @Field()
  shop: string;
}

@InputType()
export class UpdateShopInput {
  @Field({ nullable: true })
  companyName?: string;

  @Field({ nullable: true })
  managerName?: string;

  @Field({ nullable: true })
  appEnabledOnStorefront?: boolean;

  @Field({ nullable: true })
  companySize?: string;

  @Field({ nullable: true })
  productCategory?: string;

  @Field({ nullable: true })
  averageProductWeight?: string;

  @Field({ nullable: true })
  merchantPaysOffset?: boolean;

  @Field({ nullable: true })
  calculateOffset?: boolean;

  @Field({ nullable: true })
  flatRateOffsetAmount?: string;

  @Field({ nullable: true })
  completedOnboarding?: boolean;

  @Field({ nullable: true })
  billingId?: string;

  @Field({ nullable: true })
  billingActive?: boolean;

  @Field({ nullable: true })
  completedInstallation?: boolean;

  @Field({ nullable: true })
  previewMode?: boolean;
}
