import { Box } from "@saleor/macaw-ui-next";
import { ColgroupHTMLAttributes, ElementRef, forwardRef } from "react";

import { GridTableProps } from "./types";

type GridTableColgroupElement = ElementRef<"colgroup">;
type GridTableColgroupProps = GridTableProps<ColgroupHTMLAttributes<HTMLElement>>;

export const GridTableColgroup = forwardRef<GridTableColgroupElement, GridTableColgroupProps>(
  ({ children, ...props }, forwardedRef) => (
    // @ts-expect-error Types of property contentEditable are incompatible.
    <Box as="colgroup" ref={forwardedRef} {...props}>
      {children}
    </Box>
  ),
);
GridTableColgroup.displayName = "GridTable.Colgroup";
