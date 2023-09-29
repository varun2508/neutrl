import ShopifyApi from "@shopify/shopify-api";
import Shopify from "shopify-api-node";
import { TContext } from "src/types";
import {
    Arg,
    Authorized,
    Ctx,
    Field,
    InputType,
    Mutation,
    ObjectType,
    Query,
    Resolver,
} from "type-graphql";
import { getConnection } from "typeorm";
import { Shop } from "../entities/ShopEntity";
import { CreateShopInput, GetShopInput, UpdateShopInput } from "./ShopInput";

@ObjectType()
class ShopResponse {
    @Field(() => Shop, { nullable: true })
    shop?: Shop;
}

@InputType()
class DeleteShopInput {
    @Field()
    shop: string;
}

@InputType()
class BillingRedirectInput {
    @Field()
    shop: string;
}

@Resolver(Shop)
export class ShopResolver {
    @Query(() => ShopResponse, { nullable: true })
    async getShop(
        @Arg("options") options: GetShopInput,
        @Ctx() { req }: TContext
    ): Promise<ShopResponse | null> {
        const result = await getConnection()
            .createQueryBuilder()
            .select("shop")
            .from(Shop, "shop")
            .where("shop.shop = :shop", { shop: options.shop })
            .getOne();
        return { shop: result };
    }

    @Mutation(() => ShopResponse)
    async register(
        @Arg("options") options: CreateShopInput,
        @Ctx() { req }: TContext
    ): Promise<ShopResponse> {
        let shop;
        // Init shopify api client
        const ShopifyClient = new Shopify({
            shopName: options.shop,
            accessToken: options.shopKey,
        });
        try {
            // Create carbon offset product
            const product = await ShopifyClient.product.create({
                title: "Carbon Neutral Offset",
                vendor: "Carbon Neutral",
                product_type: "Carbon Offset",
                images: [
                    {
                        src: "https://i.imgur.com/lhxNYjV.png",
                    },
                ],
                variants: [
                    {
                        option1: "0 lbs Offset of CO2",
                        price: "0.00",
                        inventory_management: null,
                        requires_shipping: false,
                        sku: "NEUTRL-OFFSET",
                    },
                ],
            });
            const result = await getConnection()
                .createQueryBuilder()
                .insert()
                .into(Shop)
                .values({
                    ...options,
                    shopifyProductId: product.id.toString(),
                })
                .returning("*")
                .execute();
            shop = result.raw[0];
        } catch (error) {
            // Duplicate username error
            if (error.code == "23505") {
                console.error("shop already exists");
            } else {
                console.error(error);
            }
            return { shop: undefined };
        }
        // Create required webhooks on shop
        await ShopifyClient.webhook.create({
            address: `${process.env.CORS_URL}/api/shopify/webhooks/order`,
            topic: "orders/create",
        });
        await ShopifyClient.webhook.create({
            address: `${process.env.CORS_URL}/api/shopify/webhooks/uninstall`,
            topic: "app/uninstalled",
        });
        const webhooks = await ShopifyClient.webhook.list();
        return { shop };
    }

    @Authorized()
    @Mutation(() => ShopResponse)
    async updateShop(
        @Arg("options") options: UpdateShopInput,
        @Ctx() { req }: TContext
    ): Promise<ShopResponse | null> {
        const result = await getConnection()
            .createQueryBuilder()
            .update(Shop)
            .set({
                ...options,
            })
            .where("shop = :shop", { shop: req.headers["x-shop-origin"] })
            .returning("*")
            .execute();
        return {
            shop: result.raw[0],
        };
    }

    @Authorized("ADMIN")
    @Mutation(() => Boolean)
    async deleteShop(
        @Arg("options") options: DeleteShopInput
    ): Promise<Boolean> {
        try {
            await getConnection()
                .createQueryBuilder()
                .delete()
                .from(Shop)
                .where("shop = :shop", { shop: options.shop })
                .execute();
            return true;
        } catch (error) {
            return false;
        }
    }

    @Authorized("ADMIN")
    @Query(() => String)
    async createBillingRedirect(
        @Arg("options") options: BillingRedirectInput
    ): Promise<String> {
        try {
            const shop = await getConnection()
                .createQueryBuilder()
                .select("shop")
                .from(Shop, "shop")
                .where("shop.shop = :shop", { shop: options.shop })
                .getOne();
            const gqlClient = new ShopifyApi.Clients.Graphql(
                shop!.shop,
                shop!.shopKey
            );
            const recurringApplicationCharge: any = await gqlClient.query({
                data: `mutation appSubscriptionCreate {
          appSubscriptionCreate(name: "Carbon Neutral Offset", 
          test: ${
              process.env.TEST_MODE?.toLowerCase() === "true" ? "true" : "null"
          }, lineItems: [
            {
              plan: {
                appRecurringPricingDetails: {
                  price: {
                    amount: 0.0,
                    currencyCode: USD
                  },
                  interval: EVERY_30_DAYS
                }
              }
            },
            {
              plan: {
                appUsagePricingDetails: {
                  cappedAmount: {
                    amount: 10000.00,
                    currencyCode: USD
                  },
                  terms: "Each Neutrl offset that is purchased by customers or the merchant."
                }
              }
            }
          ],
          returnUrl: "${process.env.CORS_URL}/home?shop=${shop!.shop}" ) {
            appSubscription {
              id
              lineItems {
                id
              }
            }
            confirmationUrl
            userErrors {
              field
              message
            }
          }
        }`,
            });
            const redirectUrl =
                recurringApplicationCharge.body.data.appSubscriptionCreate
                    .confirmationUrl;
            return redirectUrl;
        } catch (error) {
            console.error(error);
            return "";
        }
    }
}
