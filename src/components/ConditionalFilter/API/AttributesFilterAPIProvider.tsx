import { ApolloClient, useApolloClient } from "@apollo/client";
import { FilterAPIProvider } from "@dashboard/components/ConditionalFilter/API/FilterAPIProvider";
import {
  BooleanValuesHandler,
  ChannelHandler,
  EnumValuesHandler,
  Handler,
} from "@dashboard/components/ConditionalFilter/API/Handler";
import {
  FilterContainer,
  FilterElement,
} from "@dashboard/components/ConditionalFilter/FilterElement";
import { AttributeTypeEnum } from "@dashboard/graphql";
import { IntlShape, useIntl } from "react-intl";

const getFilterElement = (value: FilterContainer, index: number): FilterElement => {
  const possibleFilterElement = value[index];

  if (typeof possibleFilterElement !== "string" && !Array.isArray(possibleFilterElement)) {
    return possibleFilterElement;
  }

  throw new Error("Unknown filter element used to create API handler");
};

const booleanTypes = [
  "filterableInDashboard",
  "isVariantOnly",
  "valueRequired",
  "visibleInStorefront",
  "filterableInStorefront",
];

const createAPIHandler = (
  selectedRow: FilterElement,
  client: ApolloClient<unknown>,
  inputValue: string,
  intl: IntlShape,
): Handler => {
  const rowType = selectedRow.rowType();

  if (rowType === "channel") {
    return new ChannelHandler(client, inputValue);
  }

  if (rowType === "attributeType") {
    return new EnumValuesHandler(AttributeTypeEnum, "attributeType", intl);
  }

  if (rowType && booleanTypes.includes(rowType) && rowType !== "attribute") {
    return new BooleanValuesHandler([
      {
        label: "Yes",
        value: "true",
        type: rowType,
        slug: "true",
      },
      {
        label: "No",
        value: "false",
        type: rowType,
        slug: "false",
      },
    ]);
  }

  throw new Error(`Unknown filter element: "${rowType}"`);
};

export const useAttributesFilterAPIProvider = (): FilterAPIProvider => {
  const intl = useIntl();
  const client = useApolloClient();

  const fetchRightOptions = async (
    position: string,
    value: FilterContainer,
    inputValue: string,
  ) => {
    const index = parseInt(position, 10);
    const filterElement = getFilterElement(value, index);

    const handler = createAPIHandler(filterElement, client, inputValue, intl);

    return handler.fetch();
  };

  const fetchLeftOptions = async () => {
    return [];
  };

  return {
    fetchRightOptions,
    fetchLeftOptions,
  };
};
