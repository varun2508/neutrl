import {
    Button,
    Card,
    EmptyState,
    FormLayout,
    Heading,
    Label,
    Page,
    RadioButton,
    Select,
    Spinner,
    Stack,
    TextField,
} from "@shopify/polaris";
import { useAppShopQuery, useUpdateShopMutation } from "@src/generated/graphql";
import { useRouter } from "next/router";
import React, { useState } from "react";
// import { useAppShopQuery } from "../src/generated/graphql";

const img = "https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg";

const Onboarding = ({ shopOrigin }) => {
    const companySizeOptions = [
        { label: "1-9", value: "1-9" },
        { label: "10-14", value: "10-14" },
        { label: "15-24", value: "15-24" },
        { label: "24-49", value: "24-49" },
        { label: "50+", value: "50+" },
    ];
    const productCategories = [
        { label: "Food & Beverage", value: "Food & Beverage" },
        { label: "Beauty", value: "Beauty" },
        { label: "Clothing", value: "Clothing" },
        { label: "Electronics", value: "Electronics" },
        { label: "Furniture", value: "Furniture" },
        { label: "Jewelry", value: "Jewelry" },
        { label: "Groceries", value: "Groceries" },
        { label: "Toys", value: "Toys" },
        { label: "Other", value: "Other" },
    ];
    const [open, setOpen] = useState(false);
    const [onboardingStep, setOnboardingStep] = useState(null);
    const [companyName, setCompanyName] = useState("");
    const [managerName, setManagerName] = useState("");
    const [companySize, setCompanySize] = useState(companySizeOptions[0].value);
    const [productCategory, setProductCategory] = useState(
        productCategories[0].value
    );
    const [averageProductWeight, setAverageProductWeight] = useState("");
    const [merchantPaysOffset, setMerchantPaysOffset] = useState(false);
    const [calculateOffset, setCalculateOffset] = useState(true);
    const [flatRateOffsetAmount, setFlatRateOffsetAmount] = useState("");
    const [updateShop, { data: updateShopData }] = useUpdateShopMutation();
    const router = useRouter();

    const handleSubmit = async () => {
        setOnboardingStep("complete");
        const dataToSend = {
            companyName,
            managerName,
            companySize,
            productCategory,
            averageProductWeight,
            merchantPaysOffset,
            calculateOffset,
            flatRateOffsetAmount,
            completedOnboarding: true,
        };
        // Submit update event to API
        await updateShop({ variables: { ...dataToSend } });
        // Reload page
        router.reload();
    };

    const { data, loading, error } = useAppShopQuery({
        variables: { shop: shopOrigin },
    });

    return (
        <Page>
            <Card sectioned>
                {!onboardingStep && (
                    <EmptyState
                        heading="Welcome to Carbon Neutral"
                        action={{
                            content: "Get started",
                            onAction: () => setOnboardingStep(1),
                        }}
                        image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
                    >
                        <p>We need a bit of information to get started!</p>
                    </EmptyState>
                )}
                {onboardingStep == 1 && (
                    <>
                        <FormLayout>
                            <Heading>Step 1 of 2</Heading>
                            <TextField
                                label="What's your company's name?"
                                value={companyName}
                                onChange={(e) => {
                                    setCompanyName(e);
                                }}
                            />
                            <TextField
                                label="What's your name?"
                                value={managerName}
                                onChange={(e) => setManagerName(e)}
                            />
                            <Select
                                label="What is your company size?"
                                options={companySizeOptions}
                                value={companySize}
                                onChange={(e) => setCompanySize(e)}
                            />
                            <Select
                                label="What type of products do you primarily sell?"
                                options={productCategories}
                                value={productCategory}
                                onChange={(e) => setProductCategory(e)}
                            />
                            <TextField
                                label="What's the average weight of the items you sell? (In lbs)?"
                                value={averageProductWeight}
                                onChange={(e) => setAverageProductWeight(e)}
                                type="number"
                            />
                            <Stack distribution="trailing">
                                <Button
                                    primary
                                    onClick={() => setOnboardingStep(2)}
                                    disabled={
                                        !companyName ||
                                        !managerName ||
                                        !averageProductWeight
                                    }
                                >
                                    Next
                                </Button>
                            </Stack>
                        </FormLayout>
                    </>
                )}
                {onboardingStep == "complete" && (
                    <div>
                        <Stack vertical alignment="center">
                            <Heading>
                                Sending you to your new Neutrl dashboard! Hang
                                tight!
                            </Heading>
                            <Spinner accessibilityLabel="Saving your information" />
                        </Stack>
                    </div>
                )}
                {onboardingStep == 2 && (
                    <>
                        <FormLayout>
                            <Heading>Step 2 of 2</Heading>
                            <Label id="merchantPaysOffset">
                                <b>Who's paying to be carbon neutral?</b>
                            </Label>
                            <Stack>
                                <RadioButton
                                    label="Merchant"
                                    checked={merchantPaysOffset === true}
                                    id="merchantPaysOffset[true]"
                                    name="merchantPaysOffset"
                                    onChange={(e, value) =>
                                        setMerchantPaysOffset(true)
                                    }
                                />
                                <RadioButton
                                    label="Customer"
                                    checked={merchantPaysOffset === false}
                                    id="merchantPaysOffset[false]"
                                    name="merchantPaysOffset"
                                    onChange={(e, value) =>
                                        setMerchantPaysOffset(false)
                                    }
                                />
                            </Stack>
                            {merchantPaysOffset == false ? (
                                <Label id="calculateOffset">
                                    <b>
                                        Which way would you like your customers
                                        to pay?
                                    </b>
                                </Label>
                            ) : (
                                <Label id="calculateOffset">
                                    <b>Which way would you like to pay?</b>
                                </Label>
                            )}
                            <Stack wrap={true}>
                                <RadioButton
                                    label="Calculated Carbon Footprint"
                                    helpText={`Our standard option that claculates each order's carbon footprint and offers the exact amount${
                                        merchantPaysOffset
                                            ? ""
                                            : " to the customer"
                                    }.`}
                                    checked={calculateOffset === true}
                                    id="calculateOffset[true]"
                                    name="calculateOffset"
                                    onChange={(e, value) => {
                                        setCalculateOffset(true);
                                    }}
                                />
                                <RadioButton
                                    label="Flat Rate Carbon Footprint"
                                    helpText={
                                        merchantPaysOffset
                                            ? "Set a flat rate carbon offset for each order."
                                            : "Offer your customers a flat rate amount."
                                    }
                                    checked={calculateOffset === false}
                                    id="calculateOffset[false]"
                                    name="calculateOffset"
                                    onChange={(e, value) =>
                                        setCalculateOffset(false)
                                    }
                                />
                            </Stack>
                            {calculateOffset == false && (
                                <TextField
                                    label="What flat rate would you like to set for each order?"
                                    type="currency"
                                    helpText="Example: $1.25"
                                    value={flatRateOffsetAmount}
                                    onChange={(e) => setFlatRateOffsetAmount(e)}
                                />
                            )}
                            <Stack distribution="trailing">
                                <Button primary onClick={handleSubmit}>
                                    Complete Signup
                                </Button>
                            </Stack>
                        </FormLayout>
                    </>
                )}
            </Card>
        </Page>
    );
};

export default Onboarding;
