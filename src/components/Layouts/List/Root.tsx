import { Box } from "@saleor/macaw-ui-next";
import { ReactNode } from "react";

interface ListPageLayoutProps {
  children: ReactNode;
  hasSaveBar?: boolean;
  hasTopNav?: boolean;
}

export const ListPageLayout = ({ children }: ListPageLayoutProps) => (
  <Box display="grid" __gridTemplateColumns="1fr" __gridTemplateRows="auto 1fr" height="100%">
    {children}
  </Box>
);
