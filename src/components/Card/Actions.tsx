import { Box, PropsWithBox } from "@saleor/macaw-ui-next";
import { ReactNode } from "react";

export const Actions = ({
  children,
  className,
  style,
  ...rest
}: PropsWithBox<{ children: ReactNode }>) => (
  <Box
    display="flex"
    flexDirection="row"
    gap={2}
    alignItems="center"
    justifyContent="flex-start"
    paddingX={6}
    paddingY={4}
    className={className}
    style={style}
    {...rest}
  >
    {children}
  </Box>
);
