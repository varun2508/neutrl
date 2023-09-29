import { Request, Response } from "express";

export type TContext = {
    req: Request;
    res: Response;
};

export type TOffsetStatus =
    | "draft"
    | "processing"
    | "complete"
    | "cancelled"
    | "error";

export type TPatchOffsetTransportationMethods = "air" | "rail" | "road" | "sea";

export type TPatchEstimateResponseError = {
    code: number;
    message: string;
} | null;

export type TPatchOrder = {
    id: string;
    mass_g: number;
    production: boolean;
    state: TOffsetStatus;
    allocation_state: string;
    price_cents_usd: string;
    patch_fee_cents_usd: string;
    allocations: unknown[];
    metadata: unknown;
};

export type TPatchEstimate = {
    id: string;
    production: boolean;
    type: TPatchOffsetTransportationMethods;
    mass_g: number;
    order: TPatchOrder;
    allocations: unknown;
};

export type TPatchEstimateResponse = {
    success: boolean;
    error: TPatchEstimateResponseError;
    data: TPatchEstimate;
} | null;
