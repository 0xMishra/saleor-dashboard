import { Box } from "@saleor/macaw-ui-next";
import { ColgroupHTMLAttributes } from "react";
import * as React from "react";

import { GridTableProps } from "./types";

type GridTableColgroupElement = React.ElementRef<"colgroup">;
type GridTableColgroupProps = GridTableProps<ColgroupHTMLAttributes<HTMLElement>>;

export const GridTableColgroup = React.forwardRef<GridTableColgroupElement, GridTableColgroupProps>(
  ({ children, ...props }, forwardedRef) => (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <Box as="colgroup" ref={forwardedRef} {...props}>
      {children}
    </Box>
  ),
);
GridTableColgroup.displayName = "GridTable.Colgroup";
