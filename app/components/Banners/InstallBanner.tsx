import { Layout, Banner, List, TextStyle } from "@shopify/polaris";
import Link from "next/link";
import React, { useState } from "react";

interface InstallBannerProps {
    completedInstallation: Boolean;
    shopOrigin: String;
}

const InstallBanner: React.FC<InstallBannerProps> = ({
    completedInstallation,
    shopOrigin,
}) => {
    const [isOpen, setIsOpen] = useState(true);
    console.log("completedInstallation", completedInstallation);
    console.log("shopOrigin", shopOrigin);
    console.log("isOpen", isOpen);
    return (
        <>
            {completedInstallation == false && isOpen == true && (
                <Layout.Section>
                    <Banner
                        title="Required setup instructions"
                        status="warning"
                        onDismiss={async () => {
                            setIsOpen(false);
                            await fetch("/api/complete-install", {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify({
                                    shop: shopOrigin,
                                }),
                            });
                        }}
                    >
                        <List type="number">
                            <List.Item>
                                <p>
                                    Click the "Settings" link in the navigation
                                    directly to the left and make sure "Neutrl
                                    app enabled on storefront" is checked and
                                    click "Save".
                                </p>
                                <img
                                    src="/images/install/step1.png"
                                    alt=""
                                    style={{ maxWidth: "500px" }}
                                />
                                <br />
                                <img
                                    src="/images/install/step1a.png"
                                    alt=""
                                    style={{ maxWidth: "500px" }}
                                />
                            </List.Item>
                            <List.Item>
                                <p>
                                    Click "Online Store" from the main
                                    navigation menu on the left side
                                </p>
                                <img
                                    src="/images/install/step2.png"
                                    alt=""
                                    style={{ maxWidth: "500px" }}
                                />
                            </List.Item>
                            <List.Item>
                                <p>
                                    Next to your live theme, click the "Actions"
                                    button and then click "Edit Code"
                                </p>
                                <img
                                    src="/images/install/step2a.png"
                                    alt=""
                                    style={{ maxWidth: "500px" }}
                                />
                            </List.Item>
                            <List.Item>
                                <p>
                                    In the theme code editor, find your cart
                                    template file. This is usually under the
                                    "Sections" folder named
                                    "cart-template.liquid" or something similar.
                                </p>
                                <img
                                    src="/images/install/step3.png"
                                    alt=""
                                    style={{ maxWidth: "500px" }}
                                />
                            </List.Item>
                            <List.Item>
                                <p>
                                    Paste this code snippet where you want our
                                    checkbox to display on your cart page:{" "}
                                    <TextStyle variation="code">{`<div class="neutrl-cart-container"></div>`}</TextStyle>
                                    . (Example: Just after the line{" "}
                                    <TextStyle variation="code">{`<div class="cart__footer">`}</TextStyle>
                                    )
                                </p>
                                <img
                                    src="/images/install/step4.png"
                                    alt=""
                                    style={{ maxWidth: "500px" }}
                                />
                            </List.Item>
                            <List.Item>Step 6: Click "Save".</List.Item>
                        </List>
                        <br />
                        <p>
                            Once you've performed the above, you're all set and
                            you can dismiss this message!
                        </p>
                    </Banner>
                </Layout.Section>
            )}
        </>
    );
};

export default InstallBanner;
