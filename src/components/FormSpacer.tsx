import { makeStyles } from "@saleor/macaw-ui";
import { ReactNode } from "react";

const useStyles = makeStyles(
  theme => ({
    spacer: {
      marginTop: theme.spacing(3),
    },
  }),
  { name: "FormSpacer" },
);

interface FormSpacerProps {
  children?: ReactNode;
}

export const FormSpacer = (props: FormSpacerProps) => {
  const { children } = props;
  const classes = useStyles(props);

  return <div className={classes.spacer}>{children}</div>;
};

FormSpacer.displayName = "FormSpacer";
export default FormSpacer;
