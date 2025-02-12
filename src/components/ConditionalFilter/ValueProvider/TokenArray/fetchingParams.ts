import { TokenType, UrlToken } from "../UrlToken";

export interface FetchingParams {
  category: string[];
  collection: string[];
  channel: string[];
  productType: string[];
  attribute: Record<string, string[]>;
}

export interface OrderFetchingParams {
  paymentStatus: string[];
  status: string[];
  authorizeStatus: string[];
  chargeStatus: string[];
  channels: string[];
  customer: string[];
  ids: string[];
}

export interface AttributeFetchingParams {
  channels: string[];
  attributeTypes: string[];
}

type FetchingParamsKeys = keyof Omit<FetchingParams, "attribute">;
type OrderParamsKeys = keyof OrderFetchingParams;
type AttributeParamsKeys = keyof AttributeFetchingParams;

export const emptyFetchingParams: FetchingParams = {
  category: [],
  collection: [],
  channel: [],
  productType: [],
  attribute: {},
};

export const emptyOrderFetchingParams: OrderFetchingParams = {
  paymentStatus: [],
  status: [],
  authorizeStatus: [],
  chargeStatus: [],
  channels: [],
  customer: [],
  ids: [],
};

export const emptyAttributeFetchingParams: AttributeFetchingParams = {
  channels: [],
  attributeTypes: [],
};

const unique = <T>(array: Iterable<T>) => Array.from(new Set(array));
const includedInParams = (c: UrlToken) =>
  TokenType.ATTRIBUTE_DROPDOWN === c.type || TokenType.ATTRIBUTE_MULTISELECT === c.type;

export const toFetchingParams = (p: FetchingParams, c: UrlToken) => {
  const key = c.name as FetchingParamsKeys;

  if (!c.isAttribute() && !p[key]) {
    p[key] = [];
  }

  if (c.isAttribute() && !p.attribute[c.name]) {
    p.attribute[c.name] = [];
  }

  if (c.isAttribute() && includedInParams(c)) {
    p.attribute[c.name] = unique(p.attribute[c.name].concat(c.value));

    return p;
  }

  if (c.isAttribute() && !includedInParams(c)) {
    p.attribute[c.name] = [];

    return p;
  }

  p[key] = unique(p[key].concat(c.value));

  return p;
};

export const toOrderFetchingParams = (p: OrderFetchingParams, c: UrlToken) => {
  const key = c.name as OrderParamsKeys;

  if (!p[key]) {
    p[key] = [];
  }

  if (key === "ids") {
    p[key] = unique(c.value);

    return p;
  }

  p[key] = unique(p[key].concat(c.value));

  return p;
};

export const toAttributeFetchingParams = (p: AttributeFetchingParams, c: UrlToken) => {
  const key = c.name as AttributeParamsKeys;

  if (!p[key]) {
    p[key] = [];
  }

  p[key] = unique(p[key].concat(c.value));

  return p;
};

export const getFetchingPrams = (
  type: "product" | "order" | "discount" | "voucher" | "attribute",
) => {
  switch (type) {
    case "product":
      return emptyFetchingParams;
    case "order":
      return emptyOrderFetchingParams;
    case "attribute":
      return emptyAttributeFetchingParams;
  }
};
