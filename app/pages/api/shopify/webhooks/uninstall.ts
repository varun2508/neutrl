import { getSdk } from "@src/generated/graphql-request";
import { verifyHook } from "@src/util/verifyWebhook";
import { GraphQLClient } from "graphql-request";

export default async function order(req, res) {
    const isFromShopify = verifyHook(req);
    // If hook cannot be verified as coming from Shopify's webhook system, do not do anything.
    if (!isFromShopify) {
        return res.status(200).json({ message: "received" });
    }
    const apiClient = new GraphQLClient(process.env.API_URL, {
        headers: {
            authorization: process.env.GQL_SECRET,
        },
    });
    const api = getSdk(apiClient);
    console.log("Uninstall notification received.");
    await api.DeleteShop({
        shop: req.headers["x-shopify-shop-domain"] as string,
    });
    res.status(200).json({ message: "received" });
}
