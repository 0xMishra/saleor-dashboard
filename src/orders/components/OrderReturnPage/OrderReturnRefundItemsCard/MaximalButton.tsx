import { Button } from "@dashboard/components/Button";
import { makeStyles } from "@saleor/macaw-ui";
import { FormattedMessage } from "react-intl";

const useStyles = makeStyles(
  theme => ({
    button: {
      marginBottom: theme.spacing(1),
      marginTop: theme.spacing(3),
    },
  }),
  { name: "MaximalButton" },
);

interface MaximalButtonProps {
  onClick: () => void;
}

const MaximalButton = ({ onClick }: MaximalButtonProps) => {
  const classes = useStyles({});

  return (
    <Button
      className={classes.button}
      onClick={onClick}
      data-test-id="set-maximal-quantity-unfulfilled-button"
    >
      <FormattedMessage id="2W4EBM" defaultMessage="Set maximal quantities" description="button" />
    </Button>
  );
};

export default MaximalButton;
