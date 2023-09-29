// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { getSdk } from "@src/generated/graphql-request";
import { GraphQLClient } from "graphql-request";

export default async (req, res) => {
    const client = new GraphQLClient(process.env.API_URL, {
        headers: {
            authorization: process.env.GQL_SECRET,
            "x-shop-origin": req.body.shop,
        },
    });
    const api = getSdk(client);
    const activateBilling = await api.UpdateShop({
        billingActive: true,
    });
    console.dir(activateBilling.updateShop.shop);
    res.status(200).json({ shop: activateBilling });
};
