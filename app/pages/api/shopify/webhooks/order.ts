import { getSdk } from "@src/generated/graphql-request";
import { GraphQLClient } from "graphql-request";
import { NextApiRequest, NextApiResponse } from "next";
import ShopifyAPI from "shopify-api-node";
import Shopify from "@shopify/shopify-api";
import btoa from "btoa";
import { useCalculateOffsetQuery } from "@src/generated/graphql";
import { verifyHook } from "@src/util/verifyWebhook";

export default async function order(req: NextApiRequest, res: NextApiResponse) {
    console.log("Order hook received.");
    const isFromShopify = verifyHook(req);
    // console.log(req);
    // Check if order contains carbon neutral offset product. Total up the amount from the carbon neutral item(s)
    // If order does not contain carbon neutral offset product, just return
    // Find shop in database
    if (
        typeof req.headers["x-shopify-shop-domain"] === "undefined" ||
        !req.headers["x-shopify-shop-domain"] ||
        !req.body ||
        !isFromShopify
    ) {
        return res.status(200).json({ message: "received" });
    }
    const apiClient = new GraphQLClient(process.env.API_URL, {
        headers: {
            authorization: process.env.GQL_SECRET,
        },
    });
    const api = getSdk(apiClient);
    const shopQuery = await api.AdminShop({
        shop: req.headers["x-shopify-shop-domain"] as string,
    });
    const shopifyClient = new Shopify.Clients.Graphql(
        shopQuery.getShop.shop.shop,
        shopQuery.getShop.shop.shopKey
    );
    // Add order to database
    await api.RecordOrder({
        orderInfo: JSON.stringify(req.body),
        shop: shopQuery.getShop.shop.shop,
    });
    let total = 0.0;
    let hasOffsetProduct = false;
    let weight = 0.0;
    if (req.body.line_items.length) {
        for (let i = 0; i < req.body.line_items.length; i++) {
            const lineItem = req.body.line_items[i];
            if (
                lineItem.product_id !== null &&
                lineItem.product_id.toString() ==
                    shopQuery.getShop.shop.shopifyProductId
            ) {
                total += parseFloat(lineItem.price) * lineItem.quantity;
                let tmpWeight = parseFloat(
                    lineItem.variant_title.split(" ")[0]
                );
                weight += tmpWeight * lineItem.quantity;
                hasOffsetProduct = true;
            }
        }
        if (shopQuery.getShop.shop.merchantPaysOffset) {
            const offsetQuery = await api.CalculateOffset({
                shop: shopQuery.getShop.shop.shop,
                weight: req.body.total_weight.toString(),
                distance: "1250",
            });
            try {
                const billingId = shopQuery.getShop.shop.billingId;
                console.log(billingId, btoa(billingId));
                await shopifyClient.query({
                    data: `mutation appUsageRecordCreate {
          appUsageRecordCreate(subscriptionLineItemId: "${btoa(
              shopQuery.getShop.shop.billingId
          )}", price: {
            amount: ${parseFloat(offsetQuery.calculateOffset.value)},
            currencyCode: USD
          }, description: "Carbon Offset Charge") {
            appUsageRecord {
              id
            }
            userErrors {
              field
              message
            }
          }
        }`,
                });
                await api.RecordOrderOffset({
                    orderId: req.body.id.toString(),
                    shop: shopQuery.getShop.shop.shop,
                    value: parseFloat(offsetQuery.calculateOffset.value),
                    weight: parseFloat(
                        offsetQuery.calculateOffset.offsetWeight
                    ),
                });
            } catch (error) {
                console.log("error", error);
                return res.status(200).json({ message: "received" });
            }
            return res.status(200).json({ message: "received" });
        }
        if (hasOffsetProduct) {
            // Add to usage
            try {
                const billingId = shopQuery.getShop.shop.billingId;
                console.log(billingId, btoa(billingId));
                await shopifyClient.query({
                    data: `mutation appUsageRecordCreate {
          appUsageRecordCreate(subscriptionLineItemId: "${btoa(
              shopQuery.getShop.shop.billingId
          )}", price: {
            amount: ${total},
            currencyCode: USD
          }, description: "Carbon Offset Charge") {
            appUsageRecord {
              id
            }
            userErrors {
              field
              message
            }
          }
        }`,
                });
                // Add offset to database
                await api.RecordOrderOffset({
                    orderId: req.body.id.toString(),
                    shop: shopQuery.getShop.shop.shop,
                    value: total,
                    weight: weight,
                });
            } catch (error) {
                console.log("error", error);
                return res.status(200).json({ message: "received" });
            }
            // Add order to database
            return res.status(200).json({ message: "received" });
        } else {
            return res.status(200).json({ message: "received" });
        }
    } else {
        return res.status(200).json({ message: "received" });
    }
}
