import {
    ApolloClient,
    ApolloProvider,
    createHttpLink,
    InMemoryCache,
} from "@apollo/client";
import { createApp } from "@shopify/app-bridge";
import { Provider } from "@shopify/app-bridge-react";
import { authenticatedFetch } from "@shopify/app-bridge-utils";
import deepMerge from "@shopify/app-bridge/actions/merge";
import { AppProvider } from "@shopify/polaris";
import "@shopify/polaris/dist/styles.css";
import translations from "@shopify/polaris/locales/en.json";
import { useRouter } from "next/router";
import React from "react";
import { useShopOrigin } from "shopify-nextjs-toolbox";
import getConfig from "next/config";

function MyApp({ Component, pageProps }) {
    const { publicRuntimeConfig } = getConfig();
    const router = useRouter();
    const shopOrigin = useShopOrigin();
    if (typeof window === "undefined" || !window.location || !shopOrigin) {
        return <></>;
    }

    const config = {
        apiKey: publicRuntimeConfig.shopifyApiPublicKey,
        forceRedirect: true,
        shopOrigin: router.query.shop || shopOrigin,
    };
    const app = createApp({
        apiKey: publicRuntimeConfig.shopifyApiPublicKey,
        shopOrigin: router.query.shop || shopOrigin,
    });

    const customFetch = (uri, options) => {
        const aggregateOptions = deepMerge(options, {
            method: "POST",
            headers: {
                "X-Shop-Origin": shopOrigin,
            },
        });
        return fetch(publicRuntimeConfig.gqlUrl, aggregateOptions);
    };

    const link = createHttpLink({
        fetch: authenticatedFetch(app, customFetch),
    });

    const client = new ApolloClient({
        uri: publicRuntimeConfig.gqlUrl,
        cache: new InMemoryCache(),
        credentials: "include",
        ssrMode: false,
        headers: {
            "X-Shop-Origin": shopOrigin,
        },
        link,
    });

    return (
        <Provider config={config}>
            <AppProvider i18n={translations}>
                <ApolloProvider client={client}>
                    <Component {...pageProps} />
                </ApolloProvider>
            </AppProvider>
        </Provider>
    );
}

MyApp.getInitialProps = async ({ ctx }) => {
    return {
        test: true,
    };
    //   console.log("ctx", ctx);
    //   return {
    //     shopOrigin: ctx.query.shop,
    //   };
};

export default MyApp;
