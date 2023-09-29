// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { getSdk } from "@src/generated/graphql-request";
import { GraphQLClient } from "graphql-request";

export default async (req, res) => {
    const client = new GraphQLClient(process.env.API_URL, {
        headers: {
            "x-shop-origin": req.body.shop,
            authorization: process.env.GQL_SECRET,
        },
    });
    const api = getSdk(client);
    const completeInstall = await api.UpdateShop({
        completedInstallation: true,
    });
    console.dir(completeInstall.updateShop.shop);
    res.status(200).json({ shop: completeInstall });
};
