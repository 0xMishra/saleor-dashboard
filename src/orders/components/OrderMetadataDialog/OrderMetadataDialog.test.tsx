import { useHasManageProductsPermission } from "@dashboard/orders/hooks/useHasManageProductsPermission";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { IntlShape, MessageDescriptor } from "react-intl";

import { OrderMetadataDialog, OrderMetadataDialogData } from "./OrderMetadataDialog";
import { TEST_ID_ORDER_LINE_METADATA, TEST_ID_PRODUCT_VARIANT_METADATA } from "./test-ids";

jest.mock("react-intl", () => ({
  FormattedMessage: (props: MessageDescriptor) => <>{props.defaultMessage || props.id || ""}</>,
  defineMessages: (messages: Record<string, MessageDescriptor>) => messages,
  useIntl: (): Pick<IntlShape, "formatMessage"> => ({
    formatMessage: ({ defaultMessage }: MessageDescriptor) => defaultMessage || "",
  }),
}));

jest.mock("./useHandleSubmit", () => ({
  useHandleOrderLineMetadataSubmit: () => ({
    onSubmit: jest.fn(),
    lastSubmittedData: undefined,
  }),
}));

jest.mock("@dashboard/orders/hooks/useHasManageProductsPermission", () => ({
  useHasManageProductsPermission: jest.fn(() => false),
}));

const mockData: OrderMetadataDialogData = {
  id: "order-line-id",
  productName: "Product Name",
  metadata: [{ key: "order-line-key", value: "order-line-value", __typename: "MetadataItem" }],
  privateMetadata: [
    {
      key: "order-line-private-key",
      value: "order-line-private-value",
      __typename: "MetadataItem",
    },
  ],
  variant: {
    id: "variant-id",
    metadata: [{ key: "variant-key", value: "variant-value", __typename: "MetadataItem" }],
    privateMetadata: [
      { key: "variant-private-key", value: "variant-private-value", __typename: "MetadataItem" },
    ],
  },
};

describe("OrderMetadataDialog", () => {
  const onCloseMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("closes when user hits close icon button", () => {
    // Arrange
    render(<OrderMetadataDialog open={true} onClose={onCloseMock} data={mockData} />);

    // Act
    fireEvent.click(screen.getByTestId("close-button"));

    // Assert
    expect(onCloseMock).toHaveBeenCalled();
  });

  it("closes when user hits close text button", () => {
    // Arrange
    render(<OrderMetadataDialog open={true} onClose={onCloseMock} data={mockData} />);

    // Act
    fireEvent.click(screen.getByTestId("back"));

    // Assert
    expect(onCloseMock).toHaveBeenCalled();
  });

  describe("ProductVariant metadata list", () => {
    it("displays product variant metadata", async () => {
      // Arrange
      render(<OrderMetadataDialog open={true} onClose={onCloseMock} data={mockData} />);

      const productVariantMetadata = screen.getByTestId(TEST_ID_PRODUCT_VARIANT_METADATA);

      // Assert - readonly metadata component displays all existing data without expansion
      expect(screen.getByText("Product variant metadata")).toBeInTheDocument();
      expect(within(productVariantMetadata).getByDisplayValue("variant-key")).toBeInTheDocument();
      expect(within(productVariantMetadata).getByDisplayValue("variant-value")).toBeInTheDocument();
      expect(
        within(productVariantMetadata).getByDisplayValue("variant-private-key"),
      ).toBeInTheDocument();
      expect(
        within(productVariantMetadata).getByDisplayValue("variant-private-value"),
      ).toBeInTheDocument();
    });

    it("hides privateMetadata from product variant when user doesn't have MANAGE_PRODUCTS permission", () => {
      // Arrange
      (useHasManageProductsPermission as jest.Mock).mockReturnValue(false);
      render(<OrderMetadataDialog open={true} onClose={onCloseMock} data={mockData} />);

      // Act
      const metadataEditors = screen.getAllByTestId("metadata-editor");
      const readonlyEditor = metadataEditors[1];

      // Assert
      expect(readonlyEditor).not.toHaveTextContent("variant-private-key");
      expect(readonlyEditor).not.toHaveTextContent("variant-private-value");
    });
  });

  describe("OrderLine metadata form", () => {
    it("displays order line metadata", async () => {
      // Arrange
      render(<OrderMetadataDialog open={true} onClose={onCloseMock} data={mockData} />);

      const orderLineMetadata = screen.getByTestId(TEST_ID_ORDER_LINE_METADATA);

      // Act - expand metadata section
      const expandButtonOrderLineMetadata = within(orderLineMetadata).getAllByTestId("expand")[0];

      fireEvent.click(expandButtonOrderLineMetadata);

      // Assert - check metadata values after expansion
      expect(within(orderLineMetadata).getByDisplayValue("order-line-key")).toBeInTheDocument();
      expect(within(orderLineMetadata).getByDisplayValue("order-line-value")).toBeInTheDocument();
      expect(
        within(orderLineMetadata).queryByDisplayValue("order-line-private-key"),
      ).not.toBeInTheDocument();
      expect(
        within(orderLineMetadata).queryByDisplayValue("order-line-private-value"),
      ).not.toBeInTheDocument();
    });
  });

  describe("OrderLine privateMetadata form", () => {
    it("displays order line private metadata", () => {
      // Arrange
      render(<OrderMetadataDialog open={true} onClose={onCloseMock} data={mockData} />);

      const orderLineMetadata = screen.getByTestId(TEST_ID_ORDER_LINE_METADATA);

      // Act - expand private metadata section
      const expandButtonOrderLinePrivateMetadata =
        within(orderLineMetadata).getAllByTestId("expand")[1];

      fireEvent.click(expandButtonOrderLinePrivateMetadata);

      // Assert - check private metadata values after expansion
      expect(
        within(orderLineMetadata).getByDisplayValue("order-line-private-key"),
      ).toBeInTheDocument();
      expect(
        within(orderLineMetadata).getByDisplayValue("order-line-private-value"),
      ).toBeInTheDocument();
      expect(
        within(orderLineMetadata).queryByDisplayValue("order-line-key"),
      ).not.toBeInTheDocument();
      expect(
        within(orderLineMetadata).queryByDisplayValue("order-line-value"),
      ).not.toBeInTheDocument();
    });
  });
});
