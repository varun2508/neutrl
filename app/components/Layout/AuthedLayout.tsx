import { Navigation, Layout, Page } from "@shopify/polaris";
import { HomeMajor, SettingsMajor } from "@shopify/polaris-icons";
import { useRouter } from "next/router";
import React from "react";

interface AuthedLayoutProps {}

const AuthedLayout: React.FC<AuthedLayoutProps> = ({ children }) => {
  const router = useRouter();
  return (
    <>
      <Navigation location={router.basePath}>
        <Navigation.Section
          items={[
            {
              url: "/",
              label: "Home",
              icon: HomeMajor,
            },
            {
              url: "/settings",
              label: "Settings",
              icon: SettingsMajor,
            },
          ]}
        ></Navigation.Section>
      </Navigation>
    </>
  );
};

export default AuthedLayout;
