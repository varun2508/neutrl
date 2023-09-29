import InstallBanner from "@components/Banners/InstallBanner";
import { useAppBridge } from "@shopify/app-bridge-react";
import {
    Button,
    Card,
    Checkbox,
    DisplayText,
    Frame,
    Label,
    Layout,
    Navigation,
    Page,
    RadioButton,
    Select,
    Stack,
    TextField,
    Toast,
} from "@shopify/polaris";
import {
    BillingStatementDollarMajor,
    HomeMajor,
    QuestionMarkMajor,
    SettingsMajor,
} from "@shopify/polaris-icons";
import { useAppShopQuery, useUpdateShopMutation } from "@src/generated/graphql";
import { NextRouter, useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";

import { useShopOrigin, useApi } from "shopify-nextjs-toolbox";

const SettingsNavigation = (router: NextRouter, shop: String) => (
    <Navigation location="/settings">
        <Navigation.Section
            items={[
                {
                    label: "Home",
                    icon: HomeMajor,
                    onClick: () => router.push(`/home?shop=${shop}`),
                },
                {
                    label: "Settings",
                    icon: SettingsMajor,
                    onClick: () => router.push(`/settings?shop=${shop}`),
                    matches: true,
                },
                {
                    label: "Billing",
                    icon: BillingStatementDollarMajor,
                    onClick: () =>
                        window.open(
                            `https://${shop}/admin/app_installations/app/neutrl`,
                            "_blank"
                        ),
                    matches: false,
                },
                {
                    label: "Support",
                    icon: QuestionMarkMajor,
                    onClick: () => window.open("mailto:support@neutrl.com"),
                },
            ]}
        ></Navigation.Section>
    </Navigation>
);
const Settings = () => {
    const router = useRouter();
    let appBridge;

    if (typeof window !== "undefined") {
        appBridge = useAppBridge();
    }

    const shopOrigin = router.query.shop as string;

    const [toastActive, setToastActive] = useState(false);
    const toggleToastActive = useCallback(
        () => setToastActive((toastActive) => !toastActive),
        []
    );
    const ToastMarkup = toastActive ? (
        <Toast onDismiss={toggleToastActive} content="Changes saved" />
    ) : null;

    const { data, loading, error } = useAppShopQuery({
        variables: { shop: shopOrigin },
        ssr: false,
    });
    const [
        updateShop,
        {
            data: updateShopData,
            loading: updateShopLoading,
            error: updateShopError,
        },
    ] = useUpdateShopMutation();
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

    const [appEnabled, setAppEnabled] = useState(false);
    const [previewEnabled, setPreviewEnabled] = useState(false);
    const [merchantPaysOffset, setMerchantPaysOffset] = useState(false);
    const [calculateOffset, setCalculateOffset] = useState(true);
    const [flatRateOffsetAmount, setFlatRateOffsetAmount] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [managerName, setManagerName] = useState("");
    const [companySize, setCompanySize] = useState(companySizeOptions[0].value);
    const [productCategory, setProductCategory] = useState(
        productCategories[0].value
    );
    const [averageProductWeight, setAverageProductWeight] = useState("");

    const handleAppEnabledChange = useCallback((newChecked) => {
        setAppEnabled(newChecked);
    }, []);
    const handlePreviewModeChange = useCallback((newChecked) => {
        setPreviewEnabled(newChecked);
    }, []);

    const handleSubmit = async () => {
        var updatedOffsetAmount = parseFloat(flatRateOffsetAmount) * 100;
        const dataToSend = {
            appEnabledOnStorefront: appEnabled,
            flatRateOffsetAmount: updatedOffsetAmount.toString(),
            companyName,
            managerName,
            companySize,
            productCategory,
            averageProductWeight,
            previewMode: previewEnabled,
        };
        await updateShop({
            variables: { ...dataToSend },
        });
        setToastActive(true);
    };

    useEffect(() => {
        function run() {
            if (data) {
                setAppEnabled(data.getShop.shop.appEnabledOnStorefront);
                setMerchantPaysOffset(data.getShop.shop.merchantPaysOffset);
                setCalculateOffset(data.getShop.shop.calculateOffset);
                setFlatRateOffsetAmount(
                    (
                        parseFloat(data.getShop.shop.flatRateOffsetAmount) / 100
                    ).toFixed(2)
                );
                setCompanyName(data.getShop.shop.companyName);
                setCompanySize(data.getShop.shop.companySize);
                setManagerName(data.getShop.shop.managerName);
                setProductCategory(data.getShop.shop.productCategory);
                setAverageProductWeight(data.getShop.shop.averageProductWeight);
                setPreviewEnabled(data.getShop.shop.previewMode);
                if (data?.getShop?.shop?.billingActive === false) {
                    if (router.query.charge_id) {
                        console.log(
                            "should activate billing",
                            data?.getShop?.shop?.billingActive
                        );
                        fetch("/api/activate-billing", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({ shop: shopOrigin }),
                        })
                            .then((response) => response.json())
                            .then((data) => {
                                console.dir(data);
                                router.reload();
                            });
                    } else {
                        console.log(
                            "should redirect to billing",
                            data?.getShop?.shop?.billingActive
                        );
                        fetch("/api/billing-url", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({ shop: shopOrigin }),
                        })
                            .then((response) => response.json())
                            .then((data) => {
                                console.log("api response", data);
                                if (typeof window !== "undefined" && data.url) {
                                    window.parent.location.href = data.url;
                                }
                            });
                    }
                }
            }
        }
        run();
    }, [data]);

    return (
        <Frame navigation={SettingsNavigation(router, shopOrigin)}>
            {ToastMarkup}
            <Page>
                <Layout>
                    <Layout.Section fullWidth>
                        <DisplayText size="large">Settings</DisplayText>

                        <InstallBanner
                            completedInstallation={
                                data?.getShop?.shop?.completedInstallation
                            }
                            shopOrigin={shopOrigin}
                        />
                    </Layout.Section>
                    <Layout.Section oneHalf>
                        <Card sectioned title="App Settings">
                            <Stack vertical={true}>
                                <Checkbox
                                    label="Neutrl app enabled on storefront"
                                    checked={appEnabled}
                                    name="appEnabled"
                                    onChange={handleAppEnabledChange}
                                />
                                <Checkbox
                                    label="Preview mode"
                                    checked={previewEnabled}
                                    name="previewMode"
                                    onChange={handlePreviewModeChange}
                                    helpText="When enabled, add ?preview_neutrl=true to the end of the URL you're on to preview your Neutrl installation."
                                />
                                <Label id="merchantPaysOffset">
                                    <b>Who is paying to be carbon neutral?</b>
                                </Label>
                                <Stack>
                                    <RadioButton
                                        label="Merchant"
                                        checked={
                                            (!!merchantPaysOffset as boolean) ===
                                            true
                                        }
                                        id="merchantPaysOffset[true]"
                                        name="merchantPaysOffset"
                                        onChange={(e, value) => {
                                            setMerchantPaysOffset(true);
                                        }}
                                    />
                                    <RadioButton
                                        label="Customer"
                                        checked={!!merchantPaysOffset === false}
                                        id="merchantPaysOffset[false]"
                                        name="merchantPaysOffset"
                                        onChange={(e, value) => {
                                            setMerchantPaysOffset(false);
                                        }}
                                    />
                                </Stack>
                                {merchantPaysOffset == false ? (
                                    <Label id="calculateOffset">
                                        <b>
                                            Which way would you like your
                                            customers to pay?
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
                                        onChange={(e, value) => {
                                            setCalculateOffset(false);
                                        }}
                                    />
                                </Stack>
                                {calculateOffset == false && (
                                    <TextField
                                        label="What flat rate would you like to set for each order?"
                                        type="currency"
                                        helpText="Example: 1.25"
                                        prefix="$"
                                        value={flatRateOffsetAmount}
                                        onChange={(e) => {
                                            console.log(e);
                                            if (e === "") {
                                                setFlatRateOffsetAmount("0.00");
                                            } else {
                                                setFlatRateOffsetAmount(e);
                                            }
                                        }}
                                    />
                                )}
                            </Stack>
                        </Card>
                    </Layout.Section>
                    <Layout.Section oneHalf>
                        <Card sectioned title="Store Information">
                            <Stack vertical={true}>
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
                                    onChange={(e) => {
                                        setManagerName(e);
                                    }}
                                />
                                <Select
                                    label="What is your company size?"
                                    options={companySizeOptions}
                                    value={companySize}
                                    onChange={(e) => {
                                        setCompanySize(e);
                                    }}
                                />
                                <Select
                                    label="What type of products do you primarily sell?"
                                    options={productCategories}
                                    value={productCategory}
                                    onChange={(e) => {
                                        setProductCategory(e);
                                    }}
                                />
                                <TextField
                                    label="What's the average weight of the items you sell? (In lbs)?"
                                    value={averageProductWeight}
                                    onChange={(e) => {
                                        setAverageProductWeight(e);
                                    }}
                                    type="number"
                                />
                            </Stack>
                        </Card>
                    </Layout.Section>
                    <Layout.Section>
                        <Stack distribution="trailing">
                            <Button
                                primary={true}
                                onClick={handleSubmit}
                                loading={updateShopLoading}
                            >
                                Save
                            </Button>
                        </Stack>
                    </Layout.Section>
                </Layout>
            </Page>
        </Frame>
    );
};

Settings.getInitialProps = async ({ ctx }) => {
    return {
        test: true,
    };
    //   console.log("ctx", ctx);
    //   return {
    //     shopOrigin: ctx.query.shop,
    //   };
};

export default Settings;
