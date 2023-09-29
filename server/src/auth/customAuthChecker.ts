import isVerified from "shopify-jwt-auth-verify";
import { TContext } from "src/types";
import { AuthChecker } from "type-graphql";

export const customAuthChecker: AuthChecker<TContext> = (
    { root, args, context, info },
    roles
) => {
    // Here we can read the api token from context
    // and check their permissions in the db against the `roles argument`
    // that comes from the `@Authorized` decorator. eg: ["ADMIN", "SHOP"]
    const req = context.req;
    // If no roles are defined in @Authorized or roles inlcudes "SHOP" then auth allows both admin and shop
    if (roles.length == 0 || roles.includes("SHOP")) {
        // Request comes from shopify app in the shopify admin if includes Bearer
        if (req.headers["authorization"]?.includes("Bearer")) {
            const validSession = isVerified(
                req.headers["authorization"].split("Bearer ")[1],
                process.env.SHOPIFY_API_SECRET
            );
            return validSession;
        }
        // Request comes from Next.js API route if authorization header does not include Bearer
        if (
            req.headers["authorization"] &&
            !req.headers["authorization"].includes("Bearer")
        ) {
            const validAuth =
                req.headers["authorization"] === process.env.GQL_SECRET;
            return validAuth;
        }
    }

    // If roles only includes "ADMIN" then limit to admin auth only
    if (roles.includes("ADMIN") && !roles.includes("SHOP")) {
        if (req.headers["authorization"]) {
            const validAuth =
                req.headers["authorization"] === process.env.GQL_SECRET;
            return validAuth;
        }
    }

    return false;
};
