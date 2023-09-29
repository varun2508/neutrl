import InstallBanner from "@components/Banners/InstallBanner";
import Onboarding from "@components/Layout/Onboarding";
import OffsetChart from "@components/OffsetChart/OffsetChart";
import { useAppBridge } from "@shopify/app-bridge-react";
import {
    Card,
    DisplayText,
    Frame,
    Heading,
    Layout,
    Navigation,
    Page,
    Spinner,
    TextStyle,
} from "@shopify/polaris";
import {
    BillingStatementDollarMajor,
    HomeMajor,
    QuestionMarkMajor,
    SettingsMajor,
} from "@shopify/polaris-icons";
import {
    useAppShopQuery,
    useGetAllShopOffsetsQuery,
} from "@src/generated/graphql";
import { NextRouter, useRouter } from "next/router";
import React, { useEffect } from "react";
import moment from "moment";

const img = "https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg";

const Home = () => {
    let appBridge;
    if (typeof window !== "undefined") {
        appBridge = useAppBridge();
    }
    const router = useRouter();

    const shopOrigin = router.query.shop as string;

    const { data, loading, error } = useAppShopQuery({
        variables: { shop: shopOrigin },
    });

    const {
        data: allOffsets,
        loading: offsetsLoading,
        error: offsetsLoadingError,
    } = useGetAllShopOffsetsQuery({
        pollInterval: 1000 * 60 * 1, // Poll API once per minute for updated stats
    });

    let offsetChartData = [];
    if (!offsetsLoading) {
        offsetChartData = allOffsets.allShopOffsets.monthlyWeight.map(
            (item) => ({
                label: moment.utc(item.month).format("MMM"),
                value: item.weight,
            })
        );
    }

    const calculateTreesSaved = (offset) => {
        if (!offset) return "0.00";
        return (+offset / 48).toFixed(2);
    };

    useEffect(() => {
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
    }, [data]);

    return (
        <>
            {!loading &&
                !error &&
                !data.getShop.shop.completedOnboarding &&
                data.getShop.shop.billingActive && (
                    <Frame>
                        <Onboarding shopOrigin={shopOrigin} />
                    </Frame>
                )}

            {!loading && !error && data.getShop.shop.completedOnboarding && (
                <Frame navigation={HomeNavigation(router, shopOrigin)}>
                    <Page>
                        <Layout>
                            <Layout.Section fullWidth>
                                <DisplayText>
                                    Let's save the planet together
                                </DisplayText>
                                <Heading element="h3">
                                    <TextStyle variation="subdued">
                                        Here's your contribution to the planet
                                    </TextStyle>
                                </Heading>

                                <InstallBanner
                                    completedInstallation={
                                        data.getShop.shop.completedInstallation
                                    }
                                    shopOrigin={shopOrigin}
                                />
                            </Layout.Section>
                            <Layout.Section oneThird>
                                <Card sectioned title="Last week">
                                    {!offsetsLoading && (
                                        <div>
                                            <p>
                                                <b>
                                                    {
                                                        allOffsets
                                                            .allShopOffsets
                                                            .lastWeekWeight
                                                    }
                                                </b>{" "}
                                                lbs of CO2 offset
                                            </p>
                                            <p>
                                                <b>
                                                    {calculateTreesSaved(
                                                        allOffsets
                                                            .allShopOffsets
                                                            .lastWeekWeight
                                                    )}
                                                </b>{" "}
                                                Equivalent trees saved
                                            </p>
                                        </div>
                                    )}
                                    {offsetsLoading && <Spinner />}
                                </Card>
                            </Layout.Section>
                            <Layout.Section oneThird>
                                <Card sectioned title="Last month">
                                    {!offsetsLoading && (
                                        <div>
                                            <p>
                                                <b>
                                                    {
                                                        allOffsets
                                                            .allShopOffsets
                                                            .lastMonthWeight
                                                    }
                                                </b>{" "}
                                                lbs of CO2 offset
                                            </p>
                                            <p>
                                                <b>
                                                    {calculateTreesSaved(
                                                        allOffsets
                                                            .allShopOffsets
                                                            .lastMonthWeight
                                                    )}
                                                </b>{" "}
                                                Equivalent trees saved
                                            </p>
                                        </div>
                                    )}
                                    {offsetsLoading && <Spinner />}
                                </Card>
                            </Layout.Section>
                            <Layout.Section oneThird>
                                <Card sectioned title="Last 12 months">
                                    {!offsetsLoading && (
                                        <div>
                                            <p>
                                                <b>
                                                    {
                                                        allOffsets
                                                            .allShopOffsets
                                                            .lastYearWeight
                                                    }
                                                </b>{" "}
                                                lbs of CO2 offset
                                            </p>
                                            <p>
                                                <b>
                                                    {calculateTreesSaved(
                                                        allOffsets
                                                            .allShopOffsets
                                                            .lastYearWeight
                                                    )}
                                                </b>{" "}
                                                Equivalent trees saved
                                            </p>
                                        </div>
                                    )}
                                    {offsetsLoading && <Spinner />}
                                </Card>
                            </Layout.Section>
                            <Layout.Section fullWidth>
                                <Card sectioned>
                                    <p
                                        style={{
                                            marginBottom: 24,
                                            textAlign: "center",
                                        }}
                                    >
                                        lbs of CO2 offset over time
                                    </p>
                                    <OffsetChart data={offsetChartData} />
                                </Card>
                            </Layout.Section>
                        </Layout>
                    </Page>
                </Frame>
            )}
        </>
    );
};

const HomeNavigation = (router: NextRouter, shop: String) => {
    return (
        <Navigation location="/home">
            <Navigation.Section
                items={[
                    {
                        label: "Home",
                        icon: HomeMajor,
                        matches: true,
                        onClick: () => router.push(`/home?shop=${shop}`),
                    },
                    {
                        label: "Settings",
                        icon: SettingsMajor,
                        onClick: () => router.push(`/settings?shop=${shop}`),
                        matches: false,
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
};

Home.getInitialProps = async ({ ctx }) => {
    return {
        test: true,
    };
    //   console.log("ctx", ctx);
    //   return {
    //     shopOrigin: ctx.query.shop,
    //   };
};

export default Home;
