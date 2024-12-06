import { AppstoreApi } from "@dashboard/apps/appstore.types";
import { useTheme } from "@saleor/macaw-ui";
import { Box, Text } from "@saleor/macaw-ui-next";
import React from "react";

interface AppListCardIntegrationsProps {
  integrations: AppstoreApi.SaleorApp["integrations"];
}

const AppListCardIntegrations = ({ integrations }: AppListCardIntegrationsProps) => {
  const { themeType } = useTheme();

  if (!integrations) {
    return null;
  }

  return (
    <Box
      as="ul"
      display="flex"
      flexDirection="row"
      flexWrap="wrap"
      gap={5}
      margin={0}
      alignItems="start"
    >
      {integrations.map(integration => (
        <Box as="li" display="flex" alignItems="center" gap={1.5} key={integration.name}>
          <Box
            height={10}
            width={10}
            borderRadius={3}
            borderStyle="solid"
            borderColor="default1"
            borderWidth={1}
            padding={1}
            display="flex"
            placeItems="center"
          >
            <img
              title={integration.name}
              src={
                themeType === "dark" ? integration.logo.dark.source : integration.logo.light.source
              }
              alt={integration.name}
            />
          </Box>
          <Text size={1} color="default2">
            {integration.name}
          </Text>
        </Box>
      ))}
    </Box>
  );
};

AppListCardIntegrations.displayName = "AppListCardIntegrations";
export default AppListCardIntegrations;
