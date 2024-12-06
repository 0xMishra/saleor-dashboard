import ActionDialog from "@dashboard/components/ActionDialog";
import { ConfirmButtonTransitionState } from "@dashboard/components/ConfirmButton";
import { FormattedMessage, useIntl } from "react-intl";

export interface OrderBulkCancelDialogProps {
  confirmButtonState: ConfirmButtonTransitionState;
  numberOfOrders: string;
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const OrderBulkCancelDialog = ({
  confirmButtonState,
  numberOfOrders,
  open,
  onClose,
  onConfirm,
}: OrderBulkCancelDialogProps) => {
  const intl = useIntl();

  return (
    <ActionDialog
      confirmButtonState={confirmButtonState}
      open={open}
      variant="delete"
      title={intl.formatMessage({
        id: "NJbzcP",
        defaultMessage: "Cancel Orders",
        description: "dialog header",
      })}
      onClose={onClose}
      onConfirm={onConfirm}
    >
      <FormattedMessage
        id="i+JSEZ"
        defaultMessage="{counter,plural,one{Are you sure you want to cancel this order?} other{Are you sure you want to cancel {displayQuantity} orders?}}"
        values={{
          counter: numberOfOrders,
          displayQuantity: <strong>{numberOfOrders}</strong>,
        }}
      />
    </ActionDialog>
  );
};

OrderBulkCancelDialog.displayName = "OrderBulkCancelDialog";
export default OrderBulkCancelDialog;
