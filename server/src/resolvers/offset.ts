import Shopify from "shopify-api-node";
import moment from "moment";
import {
    TContext,
    TPatchEstimateResponse,
    TPatchOffsetTransportationMethods,
} from "src/types";
import {
    Arg,
    Authorized,
    Ctx,
    Field,
    InputType,
    Mutation,
    ObjectType,
    Query,
} from "type-graphql";
import { Offset } from "../entities/OffsetEntity";
import { Shop } from "../entities/ShopEntity";
import { gramsToLbs, lbsToGrams, milesToMeters } from "../util/conversions";
import { patchApi } from "../util/patch";

@ObjectType()
class OffsetCalculationResponse {
    @Field(() => String)
    value: String;

    @Field()
    offsetWeight: String;

    @Field()
    variantId: Number;
}

@InputType()
class OffsetRecordInput {
    @Field()
    shop: string;

    @Field()
    value: number;

    @Field()
    weight: number;

    @Field()
    orderId: string;
}

@InputType()
class OffsetCalculationInput {
    @Field()
    shop: string;

    @Field()
    weight: string;

    @Field()
    distance: string;

    @Field()
    quantity: string;
}

@InputType()
class AllShopOffsetsInput {
    @Field()
    shop: string;
}

@ObjectType()
class MonthlyWeight {
    @Field({ nullable: true })
    month: number;

    @Field({ nullable: true })
    weight: number;
}

@ObjectType()
class AllShopOffsetsResponse {
    @Field()
    lastWeekWeight: number;

    @Field()
    lastMonthWeight: number;

    @Field()
    lastYearWeight: number;

    @Field(() => [MonthlyWeight])
    monthlyWeight: MonthlyWeight[];
}

type RecordOffsetData = {
    shop: string;
    value: number;
    weight: number;
    orderId: string;
    offsetProjectId?: string | null;
};

export class OffsetResolver {
    @Query(() => AllShopOffsetsResponse)
    async allShopOffsets(
        @Ctx() { req }: TContext
    ): Promise<AllShopOffsetsResponse> {
        const shop = req.headers["x-shop-origin"];
        const lbsToTons = (lbs: number) => lbs * 0.0005;
        const { weight: lastWeekWeight } = await Offset.createQueryBuilder(
            "offset"
        )
            .where(`shop = '${shop}'`)
            .andWhere(
                `offset.createdAt > '${moment()
                    .subtract(1, "week")
                    .format("YYYY-MM-DD HH:mm:ss")}'`
            )
            .select("SUM(weight)", "weight")
            .getRawOne();
        const { weight: lastMonthWeight } = await Offset.createQueryBuilder(
            "offset"
        )
            .where(`shop = '${shop}'`)
            .andWhere(
                `offset.createdAt > '${moment()
                    .subtract(1, "month")
                    .format("YYYY-MM-DD HH:mm:ss")}'`
            )
            .select("SUM(weight)", "weight")
            .getRawOne();
        const { weight: lastYearWeight } = await Offset.createQueryBuilder(
            "offset"
        )
            .where(`shop = '${shop}'`)
            .andWhere(
                `offset.createdAt > '${moment()
                    .subtract(1, "year")
                    .format("YYYY-MM-DD HH:mm:ss")}'`
            )
            .select("SUM(weight)", "weight")
            .getRawOne();
        const monthlyWeight = await Offset.createQueryBuilder("offset")
            .where(`shop = '${shop}'`)
            .andWhere(
                `offset.createdAt > '${moment()
                    .subtract(1, "year")
                    .format("YYYY-MM-DD HH:mm:ss")}'`
            )
            .select([
                `DATE_TRUNC('month', offset.createdAt) AS month`,
                "SUM(weight) AS weight",
            ])
            .groupBy("month")
            .orderBy("month")
            .getRawMany();
        monthlyWeight.forEach((row) => {
            row.weight = row.weight || 0;
        });

        return {
            lastWeekWeight: lastWeekWeight || 0,
            lastMonthWeight: lastMonthWeight || 0,
            lastYearWeight: lastYearWeight || 0,
            monthlyWeight: monthlyWeight,
        };
    }

    @Query(() => OffsetCalculationResponse)
    async calculateOffset(
        @Arg("options") options: OffsetCalculationInput,
        @Ctx() { req }: TContext
    ): Promise<OffsetCalculationResponse> {
        const shop = await Shop.findOne({ shop: options.shop });
        let shippingCO2Weight: number = 0;
        let calculatedOffset: number = 0;
        // FEATURE FLAG: use_patch_estimations
        if (
            shop?.featureFlags &&
            shop?.featureFlags.includes("use_patch_estimations")
        ) {
            const averageProductWeight =
                parseFloat(shop!.averageProductWeight) > 0
                    ? (shop!.averageProductWeight as string)
                    : (process.env.MIN_OFFSET_WEIGHT as string);

            if (
                parseFloat(options.weight) <
                    parseFloat(process.env.MIN_OFFSET_WEIGHT) ||
                parseFloat(options.weight) == 0
            ) {
                options.weight =
                    (
                        parseFloat(averageProductWeight) *
                        parseInt(options.quantity)
                    ).toFixed(2) || "0.0";
            }
            const startingWeight = parseFloat(options.weight);
            const transportationMethod: TPatchOffsetTransportationMethods =
                "air";
            const projectId: string = shop!.offsetProjectId;
            const distanceM = milesToMeters(parseFloat(options.distance));
            const packageMassG = lbsToGrams(startingWeight);
            let patchEstimate: TPatchEstimateResponse;
            // 15% Neutrl Fee
            const NEUTRL_FEE: number = 1.15;
            const PATCH_FEE_RATE: number = 1.1;
            if (
                !shop?.calculateOffset &&
                typeof shop?.flatRateOffsetAmount !== "undefined"
            ) {
                console.log("do not calculate shop offset");
                calculatedOffset = parseInt(shop?.flatRateOffsetAmount) / 100;
            } else {
                let patchEstimateData;
                if (
                    typeof projectId !== "undefined" &&
                    projectId !== "" &&
                    projectId !== null
                ) {
                    patchEstimateData = {
                        distance_m: distanceM,
                        transportation_method: transportationMethod,
                        package_mass_g: packageMassG,
                        create_order: true,
                        project_id: projectId,
                    };
                } else {
                    patchEstimateData = {
                        distance_m: distanceM,
                        transportation_method: transportationMethod,
                        package_mass_g: packageMassG,
                        create_order: true,
                    };
                }
                patchEstimate = await patchApi.estimates.createShippingEstimate(
                    patchEstimateData
                );
                console.dir(patchEstimate);
                console.dir(patchEstimate?.data?.order.allocations);
                const patchOrder = patchEstimate!.data.order;
                const patchTotalCents =
                    parseFloat(patchOrder.patch_fee_cents_usd) +
                    parseFloat(patchOrder.price_cents_usd);
                shippingCO2Weight = gramsToLbs(patchOrder.mass_g);
                calculatedOffset = (patchTotalCents / 100) * NEUTRL_FEE;
            }
        } else {
            // OLD CALCULATION METHOD
            const averageProductWeight = shop?.averageProductWeight as string;

            if (parseFloat(options.weight) == 0) {
                options.weight =
                    (
                        parseFloat(averageProductWeight) *
                        parseInt(options.quantity)
                    ).toFixed(2) || "0.0";
            }

            // Calculate lbs of CO2 emitted from shipping this product a certain distance (freight)
            const DISTANCE: number = parseFloat(options.distance);
            const DOLLARS_PER_CO2_LB: number = 0.00412249705;
            const TOTAL_CARGO_WEIGHT: number = 20;
            const GRAMS_CO2_PER_TON_MILE: number = 161.8;
            console.log("Weight submitted: ", options.weight);
            const minWeight = parseFloat(process.env.MIN_OFFSET_WEIGHT);
            const startingWeight =
                parseFloat(options.weight) < minWeight
                    ? minWeight
                    : parseFloat(options.weight);
            // 15% transaction fee
            const FEE: number = 0.15;
            const SHOPIFY_FEE: number = 0.2;
            const lbsToTons = (lbs: number) => lbs * 0.0005;
            const gramsToLbs = (grams: number) => grams * 0.00220462;
            shippingCO2Weight =
                gramsToLbs(
                    DISTANCE * TOTAL_CARGO_WEIGHT * GRAMS_CO2_PER_TON_MILE
                ) * lbsToTons(startingWeight);
            calculatedOffset = shippingCO2Weight * DOLLARS_PER_CO2_LB;
            // Add platform fee ontime (15% currently)
            calculatedOffset += calculatedOffset * FEE;

            // Add Shopify fee
            // calculatedOffset += calculatedOffset * SHOPIFY_FEE;

            // Once the calculation is run, check that the shopify variant for this value already exists
            // Change calculatedOffset variable if store has a flat fee and flat rate is the selected option
            if (
                !shop?.calculateOffset &&
                typeof shop?.flatRateOffsetAmount !== "undefined"
            ) {
                console.log("do not calculate shop offset");
                calculatedOffset = parseInt(shop?.flatRateOffsetAmount) / 100;
            }
        }

        let variantId = 0;
        if (shop) {
            const shopify = new Shopify({
                shopName: shop.shop,
                accessToken: shop.shopKey,
            });
            if (!shop.shopifyProductId) {
                // If shop in database for some reason doesn't have a co2 offset product already
                const product = await shopify.product.create({
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
                            option1: `${shippingCO2Weight.toFixed(
                                2
                            )} lbs Offset of CO2${
                                !shop.calculateOffset ? " - Flat" : ""
                            }`,
                            price: calculatedOffset.toFixed(2),
                            inventory_management: null,
                            requires_shipping: false,
                            sku: "NEUTRL-OFFSET",
                        },
                    ],
                });
                variantId = product.variants[0].id;
                await Shop.update(
                    { shop: options.shop },
                    {
                        shopifyProductId: variantId.toString(),
                    }
                );
            } else {
                const productVariants = await shopify.productVariant.list(
                    parseInt(shop.shopifyProductId),
                    {
                        limit: 100,
                    }
                );
                const matchingVariant = productVariants.find(
                    (variant) =>
                        variant.price === calculatedOffset.toFixed(2) &&
                        variant.title ===
                            `${shippingCO2Weight.toFixed(2)} lbs Offset of CO2${
                                !shop.calculateOffset ? " - Flat" : ""
                            }`
                );
                if (matchingVariant) {
                    variantId = matchingVariant.id;
                } else {
                    // Check if product has >= 90 variants. If it does, delete the oldest variant before creating a new one.
                    // This is to avoide the 100 variant limit imposed by Shopify while adding a 10 variant buffer for high-traffic merchants.
                    console.log("number of variants", productVariants.length);
                    if (productVariants.length >= 90) {
                        console.log(
                            "product variants length too long",
                            productVariants.length
                        );
                        await shopify.productVariant.delete(
                            parseInt(shop.shopifyProductId),
                            productVariants[0].id
                        );
                    }
                    try {
                        console.log(
                            "calculatedOffset",
                            calculatedOffset.toFixed(2)
                        );
                        console.log(
                            "shop.shopifyProductId",
                            shop.shopifyProductId
                        );
                        const variant = await shopify.productVariant.create(
                            parseInt(shop.shopifyProductId),
                            {
                                option1: `${shippingCO2Weight.toFixed(
                                    2
                                )} lbs Offset of CO2${
                                    !shop.calculateOffset ? " - Flat" : ""
                                }`,
                                price: calculatedOffset.toFixed(2),
                                inventory_management: null,
                                requires_shipping: false,
                                sku: "NEUTRL-OFFSET",
                            }
                        );
                        variantId = variant.id;
                    } catch (e) {
                        console.log("Error: ", e);
                    }
                }
            }
        }

        return {
            value: calculatedOffset.toFixed(2),
            variantId: variantId as number,
            offsetWeight: shippingCO2Weight.toFixed(2),
        };
    }

    @Authorized()
    @Mutation(() => Boolean)
    async recordOffset(
        @Arg("options") options: OffsetRecordInput,
        @Ctx() { req }: TContext
    ) {
        try {
            const shop = await Shop.findOne({ shop: options.shop });
            await Offset.create({
                shop: options.shop,
                value: options.value,
                weight: options.weight,
                orderId: options.orderId,
                offsetProjectId:
                    shop!.featureFlags &&
                    shop!.featureFlags !== null &&
                    shop!.featureFlags.includes("use_patch_estimations")
                        ? shop!.offsetProjectId
                        : "",
            }).save();
            return true;
        } catch (error) {
            console.error("Error creating offset: ", error);
            return false;
        }
    }

    // @Authorized("ADMIN")
    @Mutation(() => Boolean)
    async processPatchOffsets() {
        try {
            // TODO: Get list of all projects from our database and process each project individually to reduce costs to Patch.io API
            const pendingOffsets = await Offset.find({
                where: {
                    offsetPurchaseStatus: "processing",
                },
            });
            let totalAmount = 0.0;
            let totalWeight = 0.0;
            if (pendingOffsets.length > 0) {
                for (let i = 0; i < pendingOffsets.length; i++) {
                    totalAmount += parseFloat(
                        pendingOffsets[i].value.toString()
                    );
                    totalWeight += lbsToGrams(
                        parseFloat(pendingOffsets[i].weight.toString())
                    );
                }
                const patchOrder = await patchApi.orders.createOrder({
                    mass_g: totalWeight,
                });
                for (let i = 0; i < pendingOffsets.length; i++) {
                    var offsetToUpdate = pendingOffsets[i];
                    await Offset.update(offsetToUpdate.id, {
                        offsetPurchaseStatus: "complete",
                    });
                }
            }
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    }
}
