import type { NextApiRequest } from "next";
import crypto from "crypto";

const createRawBody = (bodyObject) =>
    Buffer.from(JSON.stringify(bodyObject)).toString("utf8");

export const verifyHook = (req: NextApiRequest): Boolean => {
    const secret = process.env.SHOPIFY_API_SECRET;
    const shopifyHmac = req.headers["x-shopify-hmac-sha256"] || "";
    const rawBody = createRawBody(req.body);
    const hash = crypto
        .createHmac("SHA256", secret)
        .update(rawBody, "utf8")
        .digest("base64");
    console.log(
        "Hook verification status:",
        hash.length === shopifyHmac.length
    );
    return hash.length === shopifyHmac.length;
};
