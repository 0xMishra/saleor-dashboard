import { MockedProvider } from "@apollo/client/testing";
import { useHasManageProductsPermission } from "@dashboard/orders/hooks/useHasManageProductsPermission";
import { fireEvent, render, screen, within } from "@testing-library/react";
import React from "react";
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
    render(
      <MockedProvider>
        <OrderMetadataDialog open={true} onClose={onCloseMock} data={mockData} />
      </MockedProvider>,
    );

    fireEvent.click(screen.getByTestId("close-button"));
    expect(onCloseMock).toHaveBeenCalled();
  });

  it("closes when user hits close text button", () => {
    render(
      <MockedProvider>
        <OrderMetadataDialog open={true} onClose={onCloseMock} data={mockData} />
      </MockedProvider>,
    );

    fireEvent.click(screen.getByTestId("back"));
    expect(onCloseMock).toHaveBeenCalled();
  });

  describe("ProductVariant metadata list", () => {
    it("displays product variant metadata", async () => {
      render(
        <MockedProvider>
          <OrderMetadataDialog open={true} onClose={onCloseMock} data={mockData} />
        </MockedProvider>,
      );

      expect(screen.getByText("Product variant metadata")).toBeInTheDocument();

      const productVariantMetadata = screen.getByTestId(TEST_ID_PRODUCT_VARIANT_METADATA);

      // Readonly metadata component displays all existing data
      // expand doesn't need to be used
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
      (useHasManageProductsPermission as jest.Mock).mockReturnValue(false);

      render(
        <MockedProvider>
          <OrderMetadataDialog open={true} onClose={onCloseMock} data={mockData} />
        </MockedProvider>,
      );

      // Private metadata should not be visible in the readonly section
      const metadataEditors = screen.getAllByTestId("metadata-editor");
      const readonlyEditor = metadataEditors[1];

      expect(readonlyEditor).not.toHaveTextContent("variant-private-key");
      expect(readonlyEditor).not.toHaveTextContent("variant-private-value");
    });
  });

  describe("OrderLine metadata form", () => {
    it("displays order line metadata", async () => {
      render(
        <MockedProvider>
          <OrderMetadataDialog open={true} onClose={onCloseMock} data={mockData} />
        </MockedProvider>,
      );

      const orderLineMetadata = screen.getByTestId(TEST_ID_ORDER_LINE_METADATA);
      const expandButtonOrderLineMetadata = within(orderLineMetadata).getAllByTestId("expand")[0];

      expect(screen.getByText("Order line metadata")).toBeInTheDocument();

      // Show metadata
      fireEvent.click(expandButtonOrderLineMetadata);

      // Metadata is visible, private metadata is not
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
      render(
        <MockedProvider>
          <OrderMetadataDialog open={true} onClose={onCloseMock} data={mockData} />
        </MockedProvider>,
      );

      const orderLineMetadata = screen.getByTestId(TEST_ID_ORDER_LINE_METADATA);
      const expandButtonOrderLinePrivateMetadata =
        within(orderLineMetadata).getAllByTestId("expand")[1];

      // Show privateMetadata
      fireEvent.click(expandButtonOrderLinePrivateMetadata);

      // Private metadata is visible, metadata is not
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
