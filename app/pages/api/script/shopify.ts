import { getSdk } from "@src/generated/graphql-request";
import createScript from "@src/util/createScript";
import { GraphQLClient } from "graphql-request";
import { NextApiRequest, NextApiResponse } from "next";

export default async function shopify(
    req: NextApiRequest,
    res: NextApiResponse
) {
    res.setHeader("Content-Type", "application/javascript");
    // Return immediately if request does not have a shop query parameter
    if (!req.query.shop) {
        return res.status(200).send("");
    }
    const apiClient = new GraphQLClient(process.env.API_URL, {
        headers: {
            authorization: process.env.GQL_SECRET,
            "x-shop-origin": req.body.shop,
        },
    });
    const api = getSdk(apiClient);
    console.log("Storefront request received");
    // console.log(req.query);
    var options = await api.AdminShop({ shop: req.query.shop as string });
    // console.log("options", options);
    // We don't want to return anything if the merchant does not have the script enabled or billing is not active
    if (
        !options.getShop.shop ||
        !options.getShop.shop.appEnabledOnStorefront ||
        !options.getShop.shop.billingActive
    ) {
        return res.status(200).send("");
    }
    const scriptToReturn = createScript({ req: req, shop: options });
    res.status(200).send(scriptToReturn);
}
