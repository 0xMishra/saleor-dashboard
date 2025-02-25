import { buttonMessages } from "@dashboard/intl";
import { Button } from "@saleor/macaw-ui-next";
import { ReactNode } from "react";
import { useIntl } from "react-intl";

interface DeleteButtonProps {
  onClick: () => void;
  label?: string | ReactNode;
  disabled?: boolean;
  testId?: string;
  children: ReactNode;
}

const DeleteButton = ({ onClick, label, testId, disabled = false }: DeleteButtonProps) => {
  const intl = useIntl();

  return (
    <Button
      variant="error"
      onClick={onClick}
      data-test-id={testId ? "confirm-delete" : "button-bar-delete"}
      disabled={disabled}
    >
      {label || intl.formatMessage(buttonMessages.delete)}
    </Button>
  );
};

export default DeleteButton;
