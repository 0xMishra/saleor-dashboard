import { DashboardModal } from "@dashboard/components/Modal";
import { Box } from "@saleor/macaw-ui-next";
import { ReactNode } from "react";

interface AppDialogProps {
  title?: string;
  onClose: () => void;
  open: boolean;
  children: ReactNode;
}

export const AppDialog = ({ children, title, onClose, ...props }: AppDialogProps) => {
  return (
    <DashboardModal aria-labelledby="extension app dialog" {...props} onChange={onClose}>
      <DashboardModal.Content size="lg">
        <DashboardModal.Header as="h2">{title}</DashboardModal.Header>
        <Box width="100%" __height={600}>
          {children}
        </Box>
      </DashboardModal.Content>
    </DashboardModal>
  );
};

export default AppDialog;
