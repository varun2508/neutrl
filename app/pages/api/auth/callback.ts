import Shopify from "@shopify/shopify-api";
import { HttpResponseError } from "@shopify/shopify-api/dist/error";
import { getSdk } from "@src/generated/graphql-request";
import { GraphQLClient } from "graphql-request";
import shopifyNode from "shopify-api-node";
import { handleAuthCallback } from "shopify-nextjs-toolbox";

const afterAuth = async (req, res, accessToken) => {
    const { shop } = req.query;
    const { access_token } = accessToken;
    // console.log("shop", shop);
    // console.log("accessToken", access_token);
    // save accessToken with the shop

    // Instatiate private api
    const client = new GraphQLClient(process.env.API_URL, {
        headers: {
            authorization: process.env.GQL_SECRET,
        },
    });
    const api = getSdk(client);
    // Check if shop exists in the datbase
    const response = await api.AdminShop({ shop });

    if (response.getShop.shop == null) {
        const shopifyApiClient = new Shopify.Clients.Graphql(
            shop,
            access_token
        );
        const restShopifyClient = new shopifyNode({
            shopName: shop,
            accessToken: access_token,
        });
        const scriptTagSrc = `${process.env.HOST}/api/script/shopify`;
        try {
            await restShopifyClient.scriptTag.create({
                event: "onload",
                src: scriptTagSrc,
                cache: true,
                display_scope: "online_store",
            });
            // await restShopifyClient.asset.create(filteredThemes[0].id, body1);
            // await restShopifyClient.asset.create(filteredThemes[0].id, body2);
        } catch (error) {
            const e: HttpResponseError = error;
            console.log("Error with creating script tag on online store");
            console.log(e);
        }

        try {
            const recurringApplicationCharge: any =
                await shopifyApiClient.query({
                    data: `mutation appSubscriptionCreate {
                      appSubscriptionCreate(name: "Carbon Neutral Offset", 
                      test: ${
                          process.env.TEST_MODE?.toLowerCase() === "true"
                              ? "true"
                              : "null"
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
                      returnUrl: "${process.env.HOST}/home?shop=${shop}" ) {
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
            const billingId =
                recurringApplicationCharge.body.data.appSubscriptionCreate
                    .appSubscription.lineItems[0].id;

            await api.register({
                shopKey: access_token,
                shop,
                billingId,
                scope: process.env.SHOPIFY_AUTH_SCOPES,
            });

            // Redirect to billing url
            return redirectUrl;
        } catch (error) {
            console.error(error);
        }
    }

    // redirect is handled by handleAuthCallback
};

export default handleAuthCallback(afterAuth);
