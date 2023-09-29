import "reflect-metadata";
require("dotenv-safe").config();
import path from "path";
import { createConnection } from "typeorm";
import express, { Request, Response } from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hello";
import { Shop } from "./entities/ShopEntity";
import { ShopResolver } from "./resolvers/shop";
import { OffsetResolver } from "./resolvers/offset";
import cors from "cors";
import { Offset } from "./entities/OffsetEntity";
import { Order } from "./entities/OrderEntity";
import { OrderResolver } from "./resolvers/order";
import { customAuthChecker } from "./auth/customAuthChecker";

const main = async () => {
    const conn = await createConnection({
        type: "postgres",
        url: process.env.DATABASE_URL,
        logging: true,
        migrationsRun: false,
        entities: [Shop, Offset, Order],
        extra:
            process.env.NODE_ENV === "production"
                ? { ssl: true, rejectUnauthorized: false }
                : {},
        synchronize: false,
    });

    const app = express();
    app.set("trust proxy", 1);
    app.use(
        cors({
            origin: true,
            credentials: true,
        })
    );

    app.get("/health-check", (req: Request, res: Response) => {
        res.status(200).end();
    });
    app.get("/customer/data-request", (req: Request, res: Response) => {
        res.status(200).end();
    });
    app.get("/customer/data-delete", (req: Request, res: Response) => {
        res.status(200).end();
    });
    app.get("/shop/delete", (req: Request, res: Response) => {
        res.status(200).end();
    });
    app.post("/customer/data-request", (req: Request, res: Response) => {
        res.status(200).end();
    });
    app.post("/customer/data-delete", (req: Request, res: Response) => {
        res.status(200).end();
    });
    app.post("/shop/delete", (req: Request, res: Response) => {
        res.status(200).end();
    });

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [
                HelloResolver,
                ShopResolver,
                OffsetResolver,
                OrderResolver,
            ],
            validate: false,
            authChecker: customAuthChecker,
        }),
        context: ({ req, res }) => ({
            req,
            res,
        }),
    });

    apolloServer.applyMiddleware({
        app,
        path: "/api/v1/graphql",
        cors: false,
    });

    app.listen(process.env.PORT, () => {
        console.log(`Server started on localhost:${process.env.PORT}`);
    });
};

main();
