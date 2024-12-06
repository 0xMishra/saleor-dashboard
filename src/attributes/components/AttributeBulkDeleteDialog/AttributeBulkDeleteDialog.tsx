import ActionDialog from "@dashboard/components/ActionDialog";
import { ConfirmButtonTransitionState } from "@dashboard/components/ConfirmButton";
import { FormattedMessage, useIntl } from "react-intl";

export interface AttributeBulkDeleteDialogProps {
  confirmButtonState: ConfirmButtonTransitionState;
  quantity: number;
  open: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

const AttributeBulkDeleteDialog = ({
  confirmButtonState,
  quantity,
  onClose,
  onConfirm,
  open,
}: AttributeBulkDeleteDialogProps) => {
  const intl = useIntl();

  return (
    <ActionDialog
      open={open}
      confirmButtonState={confirmButtonState}
      onClose={onClose}
      onConfirm={onConfirm}
      title={intl.formatMessage({
        id: "rKf4LU",
        defaultMessage: "Delete attributes",
        description: "dialog title",
      })}
      variant="delete"
      data-test-id="attribute-bulk-delete-dialog"
    >
      <FormattedMessage
        id="lG/MDw"
        defaultMessage="{counter,plural,one{Are you sure you want to delete this attribute?} other{Are you sure you want to delete {displayQuantity} attributes?}}"
        data-test-id="delete-attr-from-list-dialog-text"
        description="dialog content"
        values={{
          counter: quantity,
          displayQuantity: <strong>{quantity}</strong>,
        }}
      />
    </ActionDialog>
  );
};

AttributeBulkDeleteDialog.displayName = "AttributeBulkDeleteDialog";
export default AttributeBulkDeleteDialog;
