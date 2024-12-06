import Link from "@dashboard/components/Link";
import PreviewPill from "@dashboard/components/PreviewPill";
import { FormChange } from "@dashboard/hooks/useForm";
import { Box, Checkbox, Text } from "@saleor/macaw-ui-next";
import { FormattedMessage } from "react-intl";

import { messages } from "./messages";

interface AllowUnpaidOrdersProps {
  onChange: FormChange;
  isChecked: boolean;
  hasError: boolean;
  disabled?: boolean;
}

export const DefaultTransactionFlowStrategy = ({
  onChange,
  isChecked,
  hasError,
  disabled,
}: AllowUnpaidOrdersProps) => (
  <Box paddingX={6}>
    <Checkbox
      name="defaultTransactionFlowStrategy"
      data-test-id="default-transaction-strategy-checkbox"
      checked={isChecked}
      error={hasError}
      onCheckedChange={value =>
        onChange({ target: { name: "defaultTransactionFlowStrategy", value } })
      }
      disabled={disabled}
    >
      <Text>
        <FormattedMessage {...messages.defaultTransactionFlowStrategyLabel} />
      </Text>{" "}
      <PreviewPill />
    </Checkbox>
    <Box paddingLeft={4}>
      {" "}
      <Text size={3} color="default2" paddingLeft={0.5}>
        <FormattedMessage
          {...messages.defaultTransactionFlowStrategyDescription}
          values={{
            link: (
              <Link
                href="https://docs.saleor.io/docs/3.x/api-reference/payments/enums/transaction-flow-strategy-enum"
                target="_blank"
                rel="noopener noreferer"
              >
                <FormattedMessage defaultMessage="Learn more" id="TdTXXf" />
              </Link>
            ),
          }}
        />
      </Text>
    </Box>
  </Box>
);
