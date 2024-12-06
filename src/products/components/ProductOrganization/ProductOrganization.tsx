// @ts-strict-ignore
import { DashboardCard } from "@dashboard/components/Card";
import { Combobox, Multiselect } from "@dashboard/components/Combobox";
import Link from "@dashboard/components/Link";
import {
  ProductChannelListingErrorFragment,
  ProductErrorCode,
  ProductErrorFragment,
} from "@dashboard/graphql";
import { ChangeEvent } from "@dashboard/hooks/useForm";
import { productTypeUrl } from "@dashboard/productTypes/urls";
import { FetchMoreProps } from "@dashboard/types";
import { getFormErrors, getProductErrorMessage } from "@dashboard/utils/errors";
import { Box, Option, Text } from "@saleor/macaw-ui-next";
import * as React from "react";
import { FormattedMessage, useIntl } from "react-intl";

interface ProductType {
  hasVariants: boolean;
  id: string;
  name: string;
}

interface ProductOrganizationProps {
  canChangeType: boolean;
  categories?: Option[];
  categoryInputDisplayValue: string;
  collections?: Option[];
  collectionsInputDisplayValue: Option[];
  data: {
    category: string;
    collections: Option[];
    productType?: ProductType;
  };
  disabled: boolean;
  errors: Array<ProductErrorFragment | ProductChannelListingErrorFragment>;
  productType?: ProductType;
  productTypeInputDisplayValue?: string;
  productTypes?: Option[];
  fetchCategories: (query: string) => void;
  fetchCollections: (query: string) => void;
  fetchMoreCategories: FetchMoreProps;
  fetchMoreCollections: FetchMoreProps;
  fetchMoreProductTypes?: FetchMoreProps;
  fetchProductTypes?: (data: string) => void;
  onCategoryChange: (event: ChangeEvent) => void;
  onCollectionChange: (event: ChangeEvent) => void;
  onProductTypeChange?: (event: ChangeEvent) => void;
  selectedProductCategory?: Option;
}

export const ProductOrganization = (props: ProductOrganizationProps) => {
  const {
    canChangeType,
    categories,
    categoryInputDisplayValue,
    collections,
    collectionsInputDisplayValue,
    data,
    disabled,
    errors,
    fetchCategories,
    fetchCollections,
    fetchMoreCategories,
    fetchMoreCollections,
    fetchMoreProductTypes,
    fetchProductTypes,
    productType,
    productTypeInputDisplayValue,
    productTypes,
    onCategoryChange,
    onCollectionChange,
    onProductTypeChange,
    selectedProductCategory,
  } = props;
  const intl = useIntl();
  const formErrors = getFormErrors(
    ["productType", "category", "collections", "isPublished"],
    errors,
  );
  const [categoryInputActive, setCategoryInputActive] = React.useState(false);

  // Input is hide to proper handle showing nested category structure
  const hideInput = !categoryInputActive && data.category && !disabled;

  const noCategoryError =
    formErrors.isPublished?.code === ProductErrorCode.PRODUCT_WITHOUT_CATEGORY
      ? formErrors.isPublished
      : null;

  return (
    <DashboardCard>
      <DashboardCard.Header>
        <DashboardCard.Title>
          {intl.formatMessage({
            id: "JjeZEG",
            defaultMessage: "Organize Product",
            description: "section header",
          })}
        </DashboardCard.Title>
      </DashboardCard.Header>
      <DashboardCard.Content gap={2} display="flex" flexDirection="column">
        {canChangeType ? (
          <Combobox
            disabled={disabled}
            data-test-id="product-type"
            options={productTypes}
            value={
              data.productType?.id
                ? {
                    value: data.productType.id,
                    label: productTypeInputDisplayValue,
                  }
                : null
            }
            error={!!formErrors.productType}
            helperText={getProductErrorMessage(formErrors.productType, intl)}
            onChange={onProductTypeChange}
            fetchOptions={fetchProductTypes}
            fetchMore={fetchMoreProductTypes}
            name="productType"
            label={intl.formatMessage({
              id: "anK7jD",
              defaultMessage: "Product Type",
            })}
          />
        ) : (
          <Box display="flex" flexDirection="column" gap={3}>
            <Box display="flex" flexDirection="column">
              <Text size={4} fontWeight="bold">
                <FormattedMessage id="anK7jD" defaultMessage="Product Type" />
              </Text>
              {productType?.id ? (
                <Text size={2}>
                  <Link href={productTypeUrl(productType?.id) ?? ""}>
                    {productType?.name ?? "..."}
                  </Link>
                </Text>
              ) : (
                <Text size={2}>{productType?.name ?? "..."}</Text>
              )}
            </Box>
          </Box>
        )}

        <Box data-test-id="category">
          <Combobox
            disabled={disabled}
            options={disabled ? [] : categories}
            value={
              data.category
                ? {
                    value: data.category,
                    label: categoryInputDisplayValue,
                  }
                : null
            }
            error={!!(formErrors.category || noCategoryError)}
            helperText={getProductErrorMessage(formErrors.category || noCategoryError, intl)}
            onChange={onCategoryChange}
            fetchOptions={fetchCategories}
            fetchMore={fetchMoreCategories}
            name="category"
            label={intl.formatMessage({
              id: "ccXLVi",
              defaultMessage: "Category",
            })}
            {...(hideInput && {
              width: "100%",
              __opacity: 0,
              position: "absolute",
            })}
            onFocus={() => {
              setCategoryInputActive(true);
            }}
            onBlur={() => {
              setCategoryInputActive(false);
            }}
            startAdornment={val => {
              if (categoryInputActive || disabled) {
                return undefined;
              }

              const availableCategories = selectedProductCategory
                ? [...categories, selectedProductCategory]
                : categories;

              const adornment = val
                ? availableCategories.find(category => category.value === val.value)?.startAdornment
                : null;

              if (!adornment) {
                return <Text size={3}>{categoryInputDisplayValue}</Text>;
              }

              return (
                <>
                  {React.cloneElement(adornment as React.ReactElement, {
                    size: 3,
                  })}
                  <Text size={3}>{categoryInputDisplayValue}</Text>
                </>
              );
            }}
            id="category-list"
          />
        </Box>
        <Multiselect
          disabled={disabled}
          options={collections}
          data-test-id="collections"
          value={collectionsInputDisplayValue}
          error={!!formErrors.collections}
          name="collections"
          onChange={onCollectionChange}
          fetchOptions={fetchCollections}
          fetchMore={fetchMoreCollections}
          label={intl.formatMessage({
            id: "ulh3kf",
            defaultMessage: "Collections",
          })}
          helperText={getProductErrorMessage(formErrors.collections, intl)}
        />
      </DashboardCard.Content>
    </DashboardCard>
  );
};
