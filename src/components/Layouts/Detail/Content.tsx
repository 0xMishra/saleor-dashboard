import { Box, BoxProps } from "@saleor/macaw-ui-next";
import * as React from "react";

interface DetailPageLayoutContentProps extends BoxProps {
  [key: `data-${string}`]: string;
  children: React.ReactNode;
}

export const Content = ({ children, ...rest }: DetailPageLayoutContentProps) => (
  <Box
    height="100%"
    overflowY="auto"
    className="hide-scrollbar"
    gridColumn="8"
    gridRow={{ mobile: "6", tablet: "12", desktop: "12" }}
    {...rest}
  >
    {children}
  </Box>
);
