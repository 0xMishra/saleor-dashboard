import { BaseListItemProps, ListItem, makeStyles } from "@saleor/macaw-ui";
import clsx from "clsx";

import Link from "../Link";

export interface ListItemLinkProps extends Omit<BaseListItemProps, "onClick" | "classes"> {
  href?: string;
  className?: string;
  linkClassName?: string;
}

const useStyles = makeStyles(
  {
    link: {
      all: "inherit",
      display: "contents",
    },
  },
  { name: "ListItemLink" },
);

export const ListItemLink = ({ href, children, linkClassName, ...props }: ListItemLinkProps) => {
  const classes = useStyles();

  if (!href) {
    return <ListItem {...props}>{children}</ListItem>;
  }

  return (
    <ListItem {...props}>
      <Link className={clsx(classes.link, linkClassName)} href={href}>
        {children}
      </Link>
    </ListItem>
  );
};

export default ListItemLink;
